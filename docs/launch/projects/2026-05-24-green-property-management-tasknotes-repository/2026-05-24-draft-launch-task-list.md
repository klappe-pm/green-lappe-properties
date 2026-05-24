---
domain: green-property-management
category: launch
sub-category: draft-launch-tasks
date-created: 2026-05-23
date-revised: 2026-05-24
doc-type: tasknotes-task-list
version: 0.1
doc-status: draft
aliases: [Draft Launch Tasks]
tags: [launch, tasknotes, tasks, draft]
---

# Draft Launch Tasks

Launch target: 2026-06-15.

These are draft tasks for critique. They intentionally call out blocked work
instead of pretending the external inputs are known.

## Governance and evidence control

- [ ] Define Green Property Management launch workstream owners [id:: GPM-T001] [project:: Green Property Management Delivery] [epic:: Governance and evidence control] [feature:: Workstream owner map] [priority:: P0] [owner:: Kevin/Megan] [depends:: none] #green-property-management/launch #project/green-property-management-delivery 🔺 ⏳ 2026-05-24 📅 2026-05-24
  - [ ] Name legal and licensing owner [id:: GPM-T002] [depends:: GPM-T001] [priority:: P0] #green-property-management/launch 🔺 ⏳ 2026-05-24 📅 2026-05-24
  - [ ] Name discovery owner [id:: GPM-T003] [depends:: GPM-T001] [priority:: P0] #green-property-management/launch 🔺 ⏳ 2026-05-24 📅 2026-05-24
  - [ ] Name operations and systems owner [id:: GPM-T004] [depends:: GPM-T001] [priority:: P1] #green-property-management/launch ⏫ ⏳ 2026-05-24 📅 2026-05-24
  - [ ] Name website and public-boundary owner [id:: GPM-T005] [depends:: GPM-T001] [priority:: P1] #green-property-management/launch ⏫ ⏳ 2026-05-24 📅 2026-05-24
- [ ] Create non-repo evidence storage for launch records [id:: GPM-T010] [project:: Green Property Management Delivery] [epic:: Governance and evidence control] [feature:: Non-repo evidence storage] [priority:: P0] [owner:: account-owner] [depends:: GPM-T001] #green-property-management/launch 🔺 ⏳ 2026-05-24 📅 2026-05-24
  - [ ] Create license-record storage outside Git [id:: GPM-T011] [depends:: GPM-T010] [priority:: P0] #green-property-management/launch 🔺 ⏳ 2026-05-24 📅 2026-05-24
  - [ ] Create counsel-note storage outside Git [id:: GPM-T012] [depends:: GPM-T010] [priority:: P0] #green-property-management/launch 🔺 ⏳ 2026-05-24 📅 2026-05-24
  - [ ] Create bank, insurance, vendor, and account evidence storage outside Git [id:: GPM-T013] [depends:: GPM-T010] [priority:: P0] #green-property-management/launch 🔺 ⏳ 2026-05-24 📅 2026-05-24
  - [ ] Record only non-sensitive storage pointers in repo docs [id:: GPM-T014] [depends:: GPM-T011, GPM-T012, GPM-T013] [priority:: P1] #green-property-management/launch ⏫ ⏳ 2026-05-25 📅 2026-05-25

## Legal and licensing gates

- [!] Confirm Megan's Washington managing broker license status [id:: GPM-T100] [project:: Green Property Management Delivery] [epic:: Legal and licensing gates] [feature:: Designated broker path] [priority:: P0] [owner:: Megan] [depends:: GPM-T001] #green-property-management/launch #blocked/external 🔺 ⏳ 2026-05-25 📅 2026-05-26
  - [ ] Save license lookup or license record outside Git [id:: GPM-T101] [depends:: GPM-T100] [priority:: P0] #green-property-management/launch 🔺 ⏳ 2026-05-25 📅 2026-05-26
  - [ ] Record status summary only, without sensitive documents [id:: GPM-T102] [depends:: GPM-T101] [priority:: P0] #green-property-management/launch 🔺 ⏳ 2026-05-26 📅 2026-05-26
- [!] Confirm designated broker endorsement eligibility [id:: GPM-T110] [project:: Green Property Management Delivery] [epic:: Legal and licensing gates] [feature:: Designated broker path] [priority:: P0] [owner:: Megan/counsel] [depends:: GPM-T100] #green-property-management/launch #blocked/external 🔺 ⏳ 2026-05-26 📅 2026-05-28
  - [ ] Confirm controlling-interest requirement [id:: GPM-T111] [depends:: GPM-T110] [priority:: P0] #green-property-management/launch 🔺 ⏳ 2026-05-26 📅 2026-05-27
  - [ ] Confirm whether Megan can serve as designated broker on target timeline [id:: GPM-T112] [depends:: GPM-T111] [priority:: P0] #green-property-management/launch 🔺 ⏳ 2026-05-27 📅 2026-05-28
- [!] Choose fallback if Megan cannot serve as designated broker now [id:: GPM-T120] [project:: Green Property Management Delivery] [epic:: Legal and licensing gates] [feature:: Designated broker path] [priority:: P0] [owner:: Kevin/Megan/counsel] [depends:: GPM-T110] #green-property-management/launch #blocked/external 🔺 ⏳ 2026-05-28 📅 2026-05-29
  - [ ] Compare wait-for-credential path [id:: GPM-T121] [depends:: GPM-T120] [priority:: P0] #green-property-management/launch 🔺 ⏳ 2026-05-28 📅 2026-05-29
  - [ ] Compare partner-designated-broker path [id:: GPM-T122] [depends:: GPM-T120] [priority:: P0] #green-property-management/launch 🔺 ⏳ 2026-05-28 📅 2026-05-29
  - [ ] Compare hired-designated-broker path [id:: GPM-T123] [depends:: GPM-T120] [priority:: P0] #green-property-management/launch 🔺 ⏳ 2026-05-28 📅 2026-05-29
  - [ ] Record go, pause, or no-go designated-broker decision [id:: GPM-T124] [depends:: GPM-T121, GPM-T122, GPM-T123] [priority:: P0] #green-property-management/launch 🔺 ⏳ 2026-05-29 📅 2026-05-29
- [!] Confirm counsel-approved pre-license owner-discovery language [id:: GPM-T130] [project:: Green Property Management Delivery] [epic:: Legal and licensing gates] [feature:: Counsel-approved outreach language] [priority:: P0] [owner:: counsel/Megan] [depends:: GPM-T120] #green-property-management/launch #blocked/external 🔺 ⏳ 2026-05-25 📅 2026-05-29
  - [ ] Confirm whether discovery outreach is allowed before licensing [id:: GPM-T131] [depends:: GPM-T130] [priority:: P0] #green-property-management/launch 🔺 ⏳ 2026-05-25 📅 2026-05-29
  - [ ] Confirm prohibited sales or service-offer language [id:: GPM-T132] [depends:: GPM-T130] [priority:: P0] #green-property-management/launch 🔺 ⏳ 2026-05-25 📅 2026-05-29
  - [ ] Record only the approved language boundary in repo docs [id:: GPM-T133] [depends:: GPM-T131, GPM-T132] [priority:: P0] #green-property-management/launch 🔺 ⏳ 2026-05-29 📅 2026-05-29
- [!] Decide legal entity and control structure [id:: GPM-T140] [project:: Green Property Management Delivery] [epic:: Legal and licensing gates] [feature:: Entity and firm licensing sequence] [priority:: P0] [owner:: Kevin/Megan/counsel] [depends:: GPM-T124] #green-property-management/launch #blocked/external 🔺 ⏳ 2026-06-01 📅 2026-06-02
- [!] Define trust-accounting and insurance launch minimums [id:: GPM-T150] [project:: Green Property Management Delivery] [epic:: Legal and licensing gates] [feature:: Trust accounting and insurance plan] [priority:: P0] [owner:: counsel/CPA/banker/broker] [depends:: GPM-T140] #green-property-management/launch #blocked/external 🔺 ⏳ 2026-06-03 📅 2026-06-06
- [!] Confirm Kevin outside-activity and role boundaries [id:: GPM-T160] [project:: Green Property Management Delivery] [epic:: Legal and licensing gates] [feature:: Kevin role boundary] [priority:: P0] [owner:: Kevin] [depends:: GPM-T001] #green-property-management/launch #blocked/external 🔺 ⏳ 2026-05-25 📅 2026-05-29

## Owner discovery proof sprint

- [ ] Build 40-name warm-owner list [id:: GPM-T200] [project:: Green Property Management Delivery] [epic:: Owner discovery proof sprint] [feature:: Warm-owner list] [priority:: P0] [owner:: Megan] [depends:: GPM-T001] #green-property-management/launch 🔺 ⏳ 2026-05-25 📅 2026-05-28
  - [ ] Add recent sellers who may retain a property [id:: GPM-T201] [depends:: GPM-T200] [priority:: P0] #green-property-management/launch 🔺 ⏳ 2026-05-25 📅 2026-05-26
  - [ ] Add current owners relocating out of area [id:: GPM-T202] [depends:: GPM-T200] [priority:: P0] #green-property-management/launch 🔺 ⏳ 2026-05-25 📅 2026-05-26
  - [ ] Add referral partners [id:: GPM-T203] [depends:: GPM-T200] [priority:: P1] #green-property-management/launch ⏫ ⏳ 2026-05-26 📅 2026-05-27
  - [ ] Tag each contact by source and likely timing [id:: GPM-T204] [depends:: GPM-T201, GPM-T202, GPM-T203] [priority:: P1] #green-property-management/launch ⏫ ⏳ 2026-05-28 📅 2026-05-28
- [!] Schedule first 10 owner discovery conversations [id:: GPM-T210] [project:: Green Property Management Delivery] [epic:: Owner discovery proof sprint] [feature:: 20 owner conversations] [priority:: P0] [owner:: Megan] [depends:: GPM-T130, GPM-T200] #green-property-management/launch #blocked/external 🔺 ⏳ 2026-06-01 📅 2026-06-02
- [!] Complete first 10 owner discovery conversations [id:: GPM-T220] [project:: Green Property Management Delivery] [epic:: Owner discovery proof sprint] [feature:: 20 owner conversations] [priority:: P0] [owner:: Megan] [depends:: GPM-T210] #green-property-management/launch #blocked/external 🔺 ⏳ 2026-06-02 📅 2026-06-05
  - [ ] Capture current management situation [id:: GPM-T221] [depends:: GPM-T220] [priority:: P0] #green-property-management/launch 🔺 ⏳ 2026-06-02 📅 2026-06-05
  - [ ] Capture top pain and trust proof needed [id:: GPM-T222] [depends:: GPM-T220] [priority:: P0] #green-property-management/launch 🔺 ⏳ 2026-06-02 📅 2026-06-05
  - [ ] Capture pricing reaction [id:: GPM-T223] [depends:: GPM-T220] [priority:: P0] #green-property-management/launch 🔺 ⏳ 2026-06-02 📅 2026-06-05
- [!] Complete second 10 owner discovery conversations [id:: GPM-T230] [project:: Green Property Management Delivery] [epic:: Owner discovery proof sprint] [feature:: 20 owner conversations] [priority:: P0] [owner:: Megan] [depends:: GPM-T220] #green-property-management/launch #blocked/external 🔺 ⏳ 2026-06-05 📅 2026-06-09
- [ ] Score discovery results [id:: GPM-T240] [project:: Green Property Management Delivery] [epic:: Owner discovery proof sprint] [feature:: Prospect scoring and pricing signal] [priority:: P0] [owner:: Kevin/Megan] [depends:: GPM-T220, GPM-T230] #green-property-management/launch 🔺 ⏳ 2026-06-09 📅 2026-06-10
  - [ ] Score fit from 1 to 5 [id:: GPM-T241] [depends:: GPM-T240] [priority:: P0] #green-property-management/launch 🔺 ⏳ 2026-06-09 📅 2026-06-10
  - [ ] Score timing from 1 to 5 [id:: GPM-T242] [depends:: GPM-T240] [priority:: P0] #green-property-management/launch 🔺 ⏳ 2026-06-09 📅 2026-06-10
  - [ ] Score legal and operational complexity [id:: GPM-T243] [depends:: GPM-T240] [priority:: P0] #green-property-management/launch 🔺 ⏳ 2026-06-09 📅 2026-06-10
- [ ] Decide launch pricing posture from discovery evidence [id:: GPM-T250] [project:: Green Property Management Delivery] [epic:: Owner discovery proof sprint] [feature:: Prospect scoring and pricing signal] [priority:: P0] [owner:: Kevin/Megan] [depends:: GPM-T240] #green-property-management/launch 🔺 ⏳ 2026-06-10 📅 2026-06-11
- [ ] Choose top owner trust proof [id:: GPM-T260] [project:: Green Property Management Delivery] [epic:: Owner discovery proof sprint] [feature:: Prospect scoring and pricing signal] [priority:: P0] [owner:: Kevin/Megan] [depends:: GPM-T240] #green-property-management/launch 🔺 ⏳ 2026-06-10 📅 2026-06-11

## First-cohort operations

- [!] Shortlist 2-5 possible first-cohort properties [id:: GPM-T300] [project:: Green Property Management Delivery] [epic:: First-cohort operations] [feature:: First-cohort acceptance rules] [priority:: P1] [owner:: Kevin/Megan] [depends:: GPM-T240, GPM-T900] #green-property-management/launch #blocked/external ⏫ ⏳ 2026-06-10 📅 2026-06-12
- [!] Draft first-cohort onboarding checklist [id:: GPM-T310] [project:: Green Property Management Delivery] [epic:: First-cohort operations] [feature:: First-cohort acceptance rules] [priority:: P1] [owner:: Kevin/Megan] [depends:: GPM-T300] #green-property-management/launch #blocked/external ⏫ ⏳ 2026-06-11 📅 2026-06-12
- [!] Draft maintenance SLA and owner approval threshold policy [id:: GPM-T320] [project:: Green Property Management Delivery] [epic:: First-cohort operations] [feature:: Maintenance SLA and approval thresholds] [priority:: P1] [owner:: Kevin/Megan/counsel] [depends:: GPM-T150, GPM-T240] #green-property-management/launch #blocked/external ⏫ ⏳ 2026-06-10 📅 2026-06-12
- [!] Build vendor escalation tree [id:: GPM-T330] [project:: Green Property Management Delivery] [epic:: First-cohort operations] [feature:: Vendor escalation tree] [priority:: P1] [owner:: Megan] [depends:: GPM-T150] #green-property-management/launch #blocked/external ⏫ ⏳ 2026-06-04 📅 2026-06-12

## Systems proof

- [ ] Define candidate owner-visible systems artifacts [id:: GPM-T400] [project:: Green Property Management Delivery] [epic:: Systems proof] [feature:: Owner-visible systems proof] [priority:: P1] [owner:: Kevin] [depends:: GPM-T220] #green-property-management/launch ⏫ ⏳ 2026-06-05 📅 2026-06-08
  - [ ] Define monthly owner packet prototype [id:: GPM-T401] [depends:: GPM-T400] [priority:: P1] #green-property-management/launch ⏫ ⏳ 2026-06-05 📅 2026-06-08
  - [ ] Define maintenance approval workflow prototype [id:: GPM-T402] [depends:: GPM-T400] [priority:: P1] #green-property-management/launch ⏫ ⏳ 2026-06-05 📅 2026-06-08
  - [ ] Define vendor transparency and invoice trail prototype [id:: GPM-T403] [depends:: GPM-T400] [priority:: P1] #green-property-management/launch ⏫ ⏳ 2026-06-05 📅 2026-06-08
- [ ] Choose one owner-visible systems artifact from discovery evidence [id:: GPM-T410] [project:: Green Property Management Delivery] [epic:: Systems proof] [feature:: Owner-visible systems proof] [priority:: P1] [owner:: Kevin/Megan] [depends:: GPM-T260, GPM-T400] #green-property-management/launch ⏫ ⏳ 2026-06-10 📅 2026-06-10
- [ ] Build v0.1 of chosen systems artifact [id:: GPM-T420] [project:: Green Property Management Delivery] [epic:: Systems proof] [feature:: Owner-visible systems proof] [priority:: P1] [owner:: Kevin] [depends:: GPM-T410] #green-property-management/launch ⏫ ⏳ 2026-06-10 📅 2026-06-12

## Website and public boundary

- [!] Confirm public-copy boundary with counsel [id:: GPM-T500] [project:: Green Property Management Delivery] [epic:: Website and public boundary] [feature:: Public copy boundary] [priority:: P0] [owner:: counsel/Megan/Kevin] [depends:: GPM-T130] #green-property-management/launch #blocked/external 🔺 ⏳ 2026-05-29 📅 2026-06-03
- [!] Revalidate domain purchase approval [id:: GPM-T510] [project:: Green Property Management Delivery] [epic:: Website and public boundary] [feature:: Domain, DNS, staging, and QA] [priority:: P1] [owner:: account-owner] [depends:: GPM-T500] #green-property-management/launch #blocked/external ⏫ ⏳ 2026-06-03 📅 2026-06-06
- [!] Execute domain purchase evidence runbook if approved [id:: GPM-T520] [project:: Green Property Management Delivery] [epic:: Website and public boundary] [feature:: Domain, DNS, staging, and QA] [priority:: P1] [owner:: account-owner] [depends:: GPM-T510] #green-property-management/launch #blocked/external ⏫ ⏳ 2026-06-08 📅 2026-06-09
- [!] Execute DNS and protected-staging runbook if approved [id:: GPM-T530] [project:: Green Property Management Delivery] [epic:: Website and public boundary] [feature:: Domain, DNS, staging, and QA] [priority:: P1] [owner:: account-owner/Kevin] [depends:: GPM-T520] #green-property-management/launch #blocked/external ⏫ ⏳ 2026-06-09 📅 2026-06-10
- [!] Draft one-page website and owner intake copy within approved boundary [id:: GPM-T540] [project:: Green Property Management Delivery] [epic:: Website and public boundary] [feature:: Public copy boundary] [priority:: P1] [owner:: Kevin/Megan] [depends:: GPM-T250, GPM-T260, GPM-T500] #green-property-management/launch #blocked/external ⏫ ⏳ 2026-06-10 📅 2026-06-12
- [!] Run website QA and release-boundary checklist [id:: GPM-T550] [project:: Green Property Management Delivery] [epic:: Website and public boundary] [feature:: Domain, DNS, staging, and QA] [priority:: P1] [owner:: Kevin/Megan] [depends:: GPM-T530, GPM-T540] #green-property-management/launch #blocked/external ⏫ ⏳ 2026-06-12 📅 2026-06-13

## Launch decision

- [!] Complete launch gate review [id:: GPM-T900] [project:: Green Property Management Delivery] [epic:: Legal and licensing gates] [feature:: Final go/no-go] [priority:: P0] [owner:: Kevin/Megan/counsel] [depends:: GPM-T124, GPM-T140, GPM-T150, GPM-T160, GPM-T240, GPM-T500] #green-property-management/launch #blocked/external 🔺 ⏳ 2026-06-10 📅 2026-06-12
  - [ ] Decide public launch allowed [id:: GPM-T901] [depends:: GPM-T900] [priority:: P0] #green-property-management/launch 🔺 ⏳ 2026-06-12 📅 2026-06-12
  - [ ] Decide private readiness only [id:: GPM-T902] [depends:: GPM-T900] [priority:: P0] #green-property-management/launch 🔺 ⏳ 2026-06-12 📅 2026-06-12
  - [ ] Decide hold or no-go [id:: GPM-T903] [depends:: GPM-T900] [priority:: P0] #green-property-management/launch 🔺 ⏳ 2026-06-12 📅 2026-06-12
- [!] Execute approved 2026-06-15 launch, readiness, or hold path [id:: GPM-T910] [project:: Green Property Management Delivery] [epic:: Legal and licensing gates] [feature:: Final go/no-go] [priority:: P0] [owner:: Kevin/Megan/account-owner] [depends:: GPM-T900, GPM-T550] #green-property-management/launch #blocked/external 🔺 ⏳ 2026-06-15 📅 2026-06-15

## Review query

```tasks
not done
path includes 2026-05-24-green-property-management-tasknotes-repository
sort by due
sort by priority
```
