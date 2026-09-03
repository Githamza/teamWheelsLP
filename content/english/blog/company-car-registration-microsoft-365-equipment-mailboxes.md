---
title: "Company Car Registration in Microsoft 365: Equipment Mailboxes Are the Native Answer (2026 Guide)"
seoTitle: "Company car registration with Exchange equipment mailboxes"
translationKey: "company-car-registration-equipment-mailboxes"
date: 2026-09-03
draft: false
description: "How to register company cars in Microsoft 365 using Exchange room and equipment mailboxes — the native, licence-free method — plus the seat-sharing and inter-site gaps a calendar cannot fill."
image: "images/blog/carpool-platform.jpg"
author: "TeamWheels Editorial"
reading_time: "12 min"
keywords: "company car registration Microsoft 365, Exchange equipment mailbox company car, book company car Outlook, pool car booking Microsoft Teams, resource mailbox vehicle, Set-CalendarProcessing equipment, New-Mailbox -Equipment, fleet booking Microsoft 365, room mailbox vs equipment mailbox, inter-site travel carpooling, TeamWheels"
canonical: "https://www.teamwheelsapp.com/en/blog/company-car-registration-microsoft-365-equipment-mailboxes/"
faq:
  - question: "What is the native way to register a company car in Microsoft 365?"
    answer: "Create an Exchange equipment mailbox. Microsoft's own documentation defines an equipment mailbox as a resource that is not location specific, and gives a company car as one of its examples alongside a projector or a portable computer. You create one in the Exchange admin center under Resources, or with the New-Mailbox cmdlet and the -Equipment switch, then employees reserve the vehicle by adding it to a calendar invitation in Outlook or Teams."
  - question: "Should a company car be a room mailbox or an equipment mailbox?"
    answer: "Equipment is the semantically correct type, and it is what Microsoft documents for vehicles. However, room lists in Exchange Online accept only room mailboxes, so equipment mailboxes cannot be browsed through Outlook's Room Finder. Some administrators deliberately register vehicles as room mailboxes to gain that browsing experience and the Places metadata that comes with it. Both work; the trade-off is correct semantics versus discoverability in Room Finder."
  - question: "Do equipment mailboxes need a Microsoft 365 licence?"
    answer: "Resource mailboxes, including room and equipment mailboxes, generally do not consume a user licence in Exchange Online. That is a large part of why the approach is so widely recommended: registering twenty pool cars adds twenty bookable resources to your tenant at no additional subscription cost. Always confirm against your own agreement and Microsoft's current licensing terms."
  - question: "Can employees see who booked a company car?"
    answer: "Yes, if you configure it. By default a resource mailbox deletes the meeting subject and adds the organiser's name instead. Setting DeleteSubject to false and AddOrganizerToSubject to false, and granting reviewer access to the resource calendar, lets colleagues see the purpose and holder of each booking. Treat this as a data-protection decision, since journey details can reveal employee whereabouts."
  - question: "Why can't an equipment mailbox handle carpooling?"
    answer: "Because a calendar reservation is an exclusive lock on an asset. When one employee books a five-seat vehicle, Exchange marks the whole car busy for that window and declines every other request. It has no concept of the four empty seats, of a route, or of a colleague travelling the same way at the same time. Exchange treats a second request as a conflict to reject, whereas a carpooling program treats it as a match to make."
  - question: "How do you handle inter-site travel between company offices?"
    answer: "Register the vehicles natively as equipment mailboxes so the fleet is bookable, then add a matching layer on top so the seats get filled. Without one, three colleagues travelling from the same office to the same site on the same morning will each reserve a separate car, and your fleet looks fully booked while running at twenty percent occupancy. TeamWheels matches those requests inside Microsoft Teams so one vehicle covers the trip."
---

# Company Car Registration in Microsoft 365: Equipment Mailboxes Are the Native Answer

*If you asked the internet how to make company cars bookable in Microsoft 365, you would get one answer over and over: treat them like meeting rooms. That advice is right, it comes straight from Microsoft's own documentation, and it solves exactly half the problem. This guide covers the half it solves, how to configure it properly, and what you still need for carpooling and inter-site travel.*

Ask in any Microsoft 365 administration community how to register a company vehicle so staff can reserve it, and the consensus arrives fast: use an Exchange resource mailbox and treat the car like a bookable meeting room. It is the most common recommendation on Reddit's sysadmin and Microsoft 365 forums, and unusually for internet consensus, it matches the vendor documentation precisely.

Microsoft defines an equipment mailbox as a resource that is not location specific — "such as a portable computer, projector, microphone, or a **company car**" ([Microsoft Learn](https://learn.microsoft.com/en-us/exchange/recipients/equipment-mailboxes)). The company car is not a creative workaround anyone invented on a forum. It is the documented example.

So the community is right. Register your vehicles as equipment mailboxes. What follows is how to do that well — and then the honest part of the story, which is that a calendar booking answers *"is this car free on Thursday?"* and cannot answer *"who else is driving to the Lyon site on Thursday, and is there a seat in their car?"*

---

## Why the Native Approach Wins on Setup

Before the limitations, credit where it is due. For pure vehicle reservation, resource mailboxes are hard to beat:

- **No licence cost.** Room and equipment mailboxes generally do not consume a Microsoft 365 user licence, so a twenty-vehicle fleet becomes bookable without adding a line to your subscription.
- **No new software.** Employees reserve a car exactly the way they book a conference room: add it to a calendar invitation in Outlook or Teams. There is no app to deploy, no training to run, and nothing for IT to maintain.
- **Identity and governance come free.** Booking rights follow your existing Entra ID groups. Data stays in your tenant, inside your retention and eDiscovery policies.
- **Availability is genuinely solved.** Free/busy lookups, conflict rejection, approval delegates and booking windows are mature, battle-tested features. Exchange has been arbitrating double-bookings for a quarter of a century.

If your requirement is *"stop the spreadsheet, let staff see which van is free"*, you can stop reading after the next section. This is the correct tool.

---

## Step 1: Create the Equipment Mailbox

You can do this in the Exchange admin center under **Recipients → Resources → Add a resource**, choosing **Equipment**. For a fleet of any size, PowerShell is faster and more consistent.

```powershell
# Connect to Exchange Online
Connect-ExchangeOnline -UserPrincipalName admin@contoso.com

# Register a single pool car as an equipment mailbox
New-Mailbox -Name "Car - Paris - Renault Clio (AB-123-CD)" `
            -Alias "car-paris-clio-ab123cd" `
            -Equipment
```

Naming is not cosmetic — it is the whole user interface. Employees pick a vehicle from an address-book list with no photos and no filters, so encode what they need to choose correctly, in a consistent order:

`Car - <Site> - <Model> (<Registration>)`

Adding the site first groups every vehicle for one office together alphabetically. Adding the licence plate removes all ambiguity when two sites run identical models. For a mixed fleet, extend the pattern with capacity or type: `Van - Lyon - Transit 9-seat (EF-456-GH)`.

To register a fleet from a CSV in one pass:

```powershell
Import-Csv .\fleet.csv | ForEach-Object {
    New-Mailbox -Name $_.DisplayName -Alias $_.Alias -Equipment
}
```

---

## Step 2: Configure Booking Behaviour

A freshly created resource mailbox uses meeting-room defaults, and a car is not a meeting room. Two defaults matter most: the booking window is **180 days** and the maximum duration is **1,440 minutes**, or twenty-four hours ([Set-CalendarProcessing reference](https://learn.microsoft.com/en-us/powershell/module/exchangepowershell/set-calendarprocessing?view=exchange-ps)). Both are usually wrong for a vehicle.

```powershell
$vehiclePolicy = @{
    AutomateProcessing         = 'AutoAccept'  # accept requests without human review
    AllowConflicts             = $false        # never double-book a physical car
    BookingWindowInDays        = 60            # no reservations a year ahead
    MaximumDurationInMinutes   = 2880          # allow a two-day trip
    AllowRecurringMeetings     = $false        # stop one booking blocking every Monday
    ScheduleOnlyDuringWorkHours = $false       # early departures are normal
    DeleteSubject              = $false        # keep the trip purpose visible
    AddOrganizerToSubject      = $false
    AddAdditionalResponse      = $true
    AdditionalResponse         = "Keys are at the Paris reception desk. Log mileage on return and report any damage to facilities@contoso.com."
}

Set-CalendarProcessing -Identity "car-paris-clio-ab123cd" @vehiclePolicy

# Apply the same policy to every vehicle at once
Get-Mailbox -RecipientTypeDetails EquipmentMailbox |
    Set-CalendarProcessing @vehiclePolicy
```

The `AdditionalResponse` field is the most underused setting in the whole model. Every booking confirmation becomes an opportunity to tell the driver where the keys live, what to do about fuel, and who to call after a scrape — which removes a large share of the questions facilities teams field by email.

### When you want approval rather than automatic acceptance

For high-value vehicles, or where a manager must sign off, delegate the decision to a person instead of the mailbox:

```powershell
Set-CalendarProcessing -Identity "car-paris-clio-ab123cd" `
    -AutomateProcessing AutoUpdate `
    -ResourceDelegates "fleet.manager@contoso.com" `
    -AllBookInPolicy $false `
    -AllRequestInPolicy $true
```

Every request now lands in the fleet manager's inbox as an accept-or-decline decision. Use this sparingly: each approval step adds latency, and a driver who waits two days for a decision will take their own car and expense the mileage instead.

### A sensible starting configuration

| Setting | Meeting room default | Recommended for a vehicle | Why |
|---------|---------------------|---------------------------|-----|
| `AutomateProcessing` | `AutoAccept` | `AutoAccept` | Approval queues kill adoption |
| `BookingWindowInDays` | 180 | 30–60 | Vehicles get sold, reassigned, serviced |
| `MaximumDurationInMinutes` | 1440 | 2880 | Multi-day trips are legitimate |
| `AllowRecurringMeetings` | `$true` | `$false` | One recurrence can block a car for a year |
| `ScheduleOnlyDuringWorkHours` | `$false` | `$false` | Early starts and late returns are normal |
| `DeleteSubject` | `$true` | `$false` | Colleagues need to see trip purpose |
| `AllowConflicts` | `$false` | `$false` | A physical car cannot be in two places |

---

## Step 3: The Room-List Trap Nobody Mentions

Here is the wrinkle that catches most administrators after go-live. Outlook's **Room Finder** — the browsable, filterable picker with capacity and location metadata — is driven by room lists. And room lists in Exchange Online accept **only room mailboxes**. Adding an equipment mailbox to one fails.

The practical consequence: your correctly-typed equipment mailboxes never appear in the nice picker. Employees must know the vehicle's name and type it into the attendee field, which is fine for a three-car fleet and miserable for thirty across five sites.

That leaves a genuine architectural choice:

| | Equipment mailbox | Room mailbox |
|---|---|---|
| **Semantically correct for a car** | Yes — Microsoft's documented example | No — a car is not a room |
| **Appears in Room Finder** | No | Yes, via a room list |
| **Supports capacity and location metadata** | Limited | Yes, through `Set-Place` |
| **Groupable by site** | By naming convention only | Yes, one room list per site |

Plenty of experienced administrators knowingly register vehicles as **room mailboxes** purely to get Room Finder browsing, site grouping and a capacity field. It is a defensible trade: strict correctness in exchange for a picker your staff can actually use. If your fleet spans multiple sites, this is usually the right call — create one room list per office, populate it with that office's vehicles, and staff can browse "Paris vehicles" the way they browse Paris meeting rooms.

> **Rule of thumb:** under five vehicles at one site, use equipment mailboxes. More than that, or across multiple sites, room mailboxes with per-site room lists will cost you less support effort.

---

## Where the Calendar Model Stops

Everything above solves one question well: **is this specific vehicle free at this specific time?**

Now consider the question your employees are actually asking on a Tuesday afternoon:

> *"I need to be at the Lyon site on Thursday morning. What are my options?"*

Nothing in Exchange can answer that. And the reason is structural, not a missing feature — it is what a calendar booking fundamentally *is*.

**A calendar reservation is an exclusive lock on an asset.** When an employee books a five-seat car from 07:00 to 19:00, Exchange marks the entire vehicle busy and declines every subsequent request. It is doing precisely what it was designed to do. But there are four empty seats in that car, and Exchange has no way to represent them, because a meeting room does not have seats that other meetings can occupy.

That single mismatch produces the failure mode every multi-site organisation eventually recognises:

- Three colleagues travel from Paris to Lyon on Thursday morning.
- Each opens Outlook, finds a free car, and books it.
- Three vehicles leave the same car park within twenty minutes of each other, each carrying one person.
- Your fleet shows as fully booked. It is running at roughly 20% occupancy.
- Facilities concludes the fleet is too small and requests budget for a fourth car.

Exchange behaved perfectly. It treated the second and third requests as **conflicts to be avoided** — when a mobility program would treat them as **matches to be made**. That is the entire gap in one sentence.

The specific things a resource mailbox structurally cannot do:

| What you need | Why a resource mailbox can't |
|---|---|
| Know a car has four free seats | A booking is an exclusive lock, not a capacity pool |
| Match colleagues on the same route | No route, origin or destination data exists |
| Fill a seat in a booked car | A second request is a conflict, so it is declined |
| Include personal-car commuting | Only company assets have mailboxes |
| Report Scope 3 Category 7 emissions | No distance, occupancy or mode data captured |
| Prompt "someone is going your way" | Calendars respond to requests; they never initiate |
| Distinguish a commute from an inter-site trip | Every booking is just a busy block |

None of this is a criticism of Exchange. You would not expect Room Finder to tell you who else is attending your meeting room. It is simply the wrong layer for the human side of travel.

---

## The Division of Labour That Actually Works

The productive conclusion is not "the Reddit consensus is wrong." It is that the consensus solves the **asset** problem, and something else has to solve the **people** problem. Keep both, and each does what it is good at:

| The job to be done | Handled by |
|--------------------|------------|
| Registering vehicles as bookable resources | **Microsoft 365** — equipment or room mailboxes |
| Availability, conflicts, approval delegates | **Microsoft 365** — `Set-CalendarProcessing` |
| Keys, fuel and damage-reporting instructions | **Microsoft 365** — `AdditionalResponse` |
| Matching colleagues travelling the same route | **TeamWheels** |
| Filling empty seats in an already-booked car | **TeamWheels** |
| Inter-site trip coordination across offices | **TeamWheels** |
| Home-to-work carpooling in personal cars | **TeamWheels** |
| Departure reminders and ride confirmation | **TeamWheels** |
| Occupancy, participation and CO₂ reporting | **TeamWheels** |

Once your vehicle registry exists natively, the only thing left to deploy is the seat-filling layer — and because [TeamWheels runs inside Microsoft Teams](/en/how-it-works/), it lands in the same place your fleet bookings already live. Employees authenticate with the same Entra ID account, the data stays in the same tenant, and there is no second app to roll out. Setup is roughly a five-minute admin consent, not an IT project.

### What this looks like in practice

The same Thursday trip, with both layers in place:

1. An employee tells the TeamWheels bot in Teams that they need to reach the Lyon site on Thursday morning.
2. The bot checks who else is already travelling that route at that time — colleagues in pool cars and colleagues in their own cars alike.
3. If a match exists, it requests a seat. The driver approves in one tap, and the vehicle that was already booked now carries three people instead of one.
4. If no match exists, the employee reserves a pool car through the ordinary Outlook flow — and their trip immediately becomes a matchable option for the next colleague who asks.
5. Both trips land in the same dashboard, with distance, occupancy and avoided emissions attached, ready for [Scope 3 Category 7 reporting](/en/blog/scope-3-employee-commuting-corporate-carpooling-usa-compliance-guide/).

The fleet did not grow. The number of trips did not fall. The occupancy per vehicle tripled, and the request for a fourth car never got written.

> **Go deeper:** For the full picture on building a program around this — policy, incentives, participation targets and ROI — see the [complete corporate carpooling guide for 2026](/en/blog/corporate-carpooling-guide-2026/), or work through [how to launch a corporate carpooling program in 30 days](/en/blog/how-to-launch-corporate-carpooling-program/).

---

## A Practical Rollout Sequence

You do not need to choose between the two layers, and you should not sequence them as a six-month project.

**Week 1 — Register the fleet natively.** Create the resource mailboxes with the naming convention and the PowerShell configuration above. Decide equipment versus room based on fleet size and number of sites. Populate `AdditionalResponse` with your keys-and-fuel instructions. This is an afternoon's work for one administrator.

**Week 2 — Measure the real problem.** Export the resource calendars and count trips, not bookings. For each site pair, ask how many vehicles left within an hour of each other heading to the same place. This number is your business case, and in most multi-site organisations it is uncomfortable.

**Week 3 — Add the seat layer.** Install TeamWheels from AppSource into your existing tenant, configure your sites, and let matching begin against both pool cars and personal vehicles. Employees need no onboarding because the bot lives in Teams.

**Week 4 — Report.** Compare occupancy per vehicle against your Week 2 baseline. Use the [savings calculator](/en/tools/savings-calculator/) to convert the change into fleet, fuel, parking and CO₂ figures your finance and sustainability teams can file.

---

## The Short Version

The community consensus is correct, and Microsoft documents it: **register company cars as Exchange equipment mailboxes.** It is free, native, governed by your existing identity policies, and it makes vehicles bookable in an afternoon. Watch the room-list constraint if your fleet spans multiple sites, and tune the booking window, duration and recurrence defaults away from meeting-room assumptions.

Then be clear-eyed about what you have built: a vehicle registry. A calendar can lock an asset for one person. It cannot see the empty seats beside them, match the colleague making the same journey, or tell your sustainability team what any of it cost in carbon. That is not a gap in your configuration — it is a different layer of the problem, and it is the layer where carpooling and inter-site travel actually live.

Register the cars in Microsoft 365. Fill them with TeamWheels.

---

## Ready to Fill the Seats You Already Paid For?

TeamWheels installs into your existing Microsoft 365 tenant from AppSource in about five minutes — same accounts, same tenant, same Teams your fleet bookings already run through.

**[Book a free demo](/en/contact/)** · **[Explore the carpooling software](/en/corporate-carpooling-software/)** · **[Calculate your savings](/en/tools/savings-calculator/)**

---

*Published by TeamWheels Editorial · September 3, 2026*

*Tags: company car registration · Exchange equipment mailbox · resource mailbox · Microsoft 365 fleet booking · pool car booking · Room Finder · Set-CalendarProcessing · inter-site travel · corporate carpooling · Microsoft Teams · Scope 3 Category 7 · TeamWheels*
