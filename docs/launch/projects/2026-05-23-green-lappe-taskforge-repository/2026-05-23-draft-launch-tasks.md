---
domain: green-lappe-properties
category: launch
sub-category: draft-launch-tasks
date-created: 2026-05-23
date-revised: 2026-05-23
doc-type: taskforge-task-list
version: 0.1
doc-status: draft
aliases: [Draft Launch Tasks]
tags: [launch, taskforge, tasks, draft]
---

# Draft Launch Tasks

Launch target: 2026-06-15.

These are draft tasks for critique. They intentionally call out blocked work
instead of pretending the external inputs are known.

## Governance and evidence control

- [ ] Define Green Lappe launch workstream owners [id:: GLP-T001] [project:: Green Lappe Launch] [epic:: Governance and evidence control] [feature:: Workstream owner map] [priority:: P0] [owner:: Kevin/Megan] [depends:: none] #green-lappe/launch #project/green-lappe-launch 🔺 ⏳ 2026-05-24 📅 2026-05-24
  - [ ] Name legal and licensing owner [id:: GLP-T002] [depends:: GLP-T001] [priority:: P0] #green-lappe/launch 🔺 ⏳ 2026-05-24 📅 2026-05-24
  - [ ] Name discovery owner [id:: GLP-T003] [depends:: GLP-T001] [priority:: P0] #green-lappe/launch 🔺 ⏳ 2026-05-24 📅 2026-05-24
  - [ ] Name operations and systems owner [id:: GLP-T004] [depends:: GLP-T001] [priority:: P1] #green-lappe/launch ⏫ ⏳ 2026-05-24 📅 2026-05-24
  - [ ] Name website and public-boundary owner [id:: GLP-T005] [depends:: GLP-T001] [priority:: P1] #green-lappe/launch ⏫ ⏳ 2026-05-24 📅 2026-05-24
- [ ] Create non-repo evidence storage for launch records [id:: GLP-T010] [project:: Green Lappe Launch] [epic:: Governance and evidence control] [feature:: Non-repo evidence storage] [priority:: P0] [owner:: account-owner] [depends:: GLP-T001] #green-lappe/launch 🔺 ⏳ 2026-05-24 📅 2026-05-24
  - [ ] Create license-record storage outside Git [id:: GLP-T011] [depends:: GLP-T010] [priority:: P0] #green-lappe/launch 🔺 ⏳ 2026-05-24 📅 2026-05-24
  - [ ] Create counsel-note storage outside Git [id:: GLP-T012] [depends:: GLP-T010] [priority:: P0] #green-lappe/launch 🔺 ⏳ 2026-05-24 📅 2026-05-24
  - [ ] Create bank, insurance, vendor, and account evidence storage outside Git [id:: GLP-T013] [depends:: GLP-T010] [priority:: P0] #green-lappe/launch 🔺 ⏳ 2026-05-24 📅 2026-05-24
  - [ ] Record only non-sensitive storage pointers in repo docs [id:: GLP-T014] [depends:: GLP-T011, GLP-T012, GLP-T013] [priority:: P1] #green-lappe/launch ⏫ ⏳ 2026-05-25 📅 2026-05-25

## Legal and licensing gates

- [!] Confirm Megan's Washington managing broker license status [id:: GLP-T100] [project:: Green Lappe Launch] [epic:: Legal and licensing gates] [feature:: Designated broker path] [priority:: P0] [owner:: Megan] [depends:: GLP-T001] #green-lappe/launch #blocked/external 🔺 ⏳ 2026-05-25 📅 2026-05-26
  - [ ] Save license lookup or license record outside Git [id:: GLP-T101] [depends:: GLP-T100] [priority:: P0] #green-lappe/launch 🔺 ⏳ 2026-05-25 📅 2026-05-26
  - [ ] Record status summary only, without sensitive documents [id:: GLP-T102] [depends:: GLP-T101] [priority:: P0] #green-lappe/launch 🔺 ⏳ 2026-05-26 📅 2026-05-26
- [!] Confirm designated broker endorsement eligibility [id:: GLP-T110] [project:: Green Lappe Launch] [epic:: Legal and licensing gates] [feature:: Designated broker path] [priority:: P0] [owner:: Megan/counsel] [depends:: GLP-T100] #green-lappe/launch #blocked/external 🔺 ⏳ 2026-05-26 📅 2026-05-28
  - [ ] Confirm controlling-interest requirement [id:: GLP-T111] [depends:: GLP-T110] [priority:: P0] #green-lappe/launch 🔺 ⏳ 2026-05-26 📅 2026-05-27
  - [ ] Confirm whether Megan can serve as designated broker on target timeline [id:: GLP-T112] [depends:: GLP-T111] [priority:: P0] #green-lappe/launch 🔺 ⏳ 2026-05-27 📅 2026-05-28
- [!] Choose fallback if Megan cannot serve as designated broker now [id:: GLP-T120] [project:: Green Lappe Launch] [epic:: Legal and licensing gates] [feature:: Designated broker path] [priority:: P0] [owner:: Kevin/Megan/counsel] [depends:: GLP-T110] #green-lappe/launch #blocked/external 🔺 ⏳ 2026-05-28 📅 2026-05-29
  - [ ] Compare wait-for-credential path [id:: GLP-T121] [depends:: GLP-T120] [priority:: P0] #green-lappe/launch 🔺 ⏳ 2026-05-28 📅 2026-05-29
  - [ ] Compare partner-designated-broker path [id:: GLP-T122] [depends:: GLP-T120] [priority:: P0] #green-lappe/launch 🔺 ⏳ 2026-05-28 📅 2026-05-29
  - [ ] Compare hired-designated-broker path [id:: GLP-T123] [depends:: GLP-T120] [priority:: P0] #green-lappe/launch 🔺 ⏳ 2026-05-28 📅 2026-05-29
  - [ ] Record go, pause, or no-go designated-broker decision [id:: GLP-T124] [depends:: GLP-T121, GLP-T122, GLP-T123] [priority:: P0] #green-lappe/launch 🔺 ⏳ 2026-05-29 📅 2026-05-29
- [!] Confirm counsel-approved pre-license owner-discovery language [id:: GLP-T130] [project:: Green Lappe Launch] [epic:: Legal and licensing gates] [feature:: Counsel-approved outreach language] [priority:: P0] [owner:: counsel/Megan] [depends:: GLP-T120] #green-lappe/launch #blocked/external 🔺 ⏳ 2026-05-25 📅 2026-05-29
  - [ ] Confirm whether discovery outreach is allowed before licensing [id:: GLP-T131] [depends:: GLP-T130] [priority:: P0] #green-lappe/launch 🔺 ⏳ 2026-05-25 📅 2026-05-29
  - [ ] Confirm prohibited sales or service-offer language [id:: GLP-T132] [depends:: GLP-T130] [priority:: P0] #green-lappe/launch 🔺 ⏳ 2026-05-25 📅 2026-05-29
  - [ ] Record only the approved language boundary in repo docs [id:: GLP-T133] [depends:: GLP-T131, GLP-T132] [priority:: P0] #green-lappe/launch 🔺 ⏳ 2026-05-29 📅 2026-05-29
- [!] Decide legal entity and control structure [id:: GLP-T140] [project:: Green Lappe Launch] [epic:: Legal and licensing gates] [feature:: Entity and firm licensing sequence] [priority:: P0] [owner:: Kevin/Megan/counsel] [depends:: GLP-T124] #green-lappe/launch #blocked/external 🔺 ⏳ 2026-06-01 📅 2026-06-02
- [!] Define trust-accounting and insurance launch minimums [id:: GLP-T150] [project:: Green Lappe Launch] [epic:: Legal and licensing gates] [feature:: Trust accounting and insurance plan] [priority:: P0] [owner:: counsel/CPA/banker/broker] [depends:: GLP-T140] #green-lappe/launch #blocked/external 🔺 ⏳ 2026-06-03 📅 2026-06-06
- [!] Confirm Kevin outside-activity and role boundaries [id:: GLP-T160] [project:: Green Lappe Launch] [epic:: Legal and licensing gates] [feature:: Kevin role boundary] [priority:: P0] [owner:: Kevin] [depends:: GLP-T001] #green-lappe/launch #blocked/external 🔺 ⏳ 2026-05-25 📅 2026-05-29

## Owner discovery proof sprint

- [ ] Build 40-name warm-owner list [id:: GLP-T200] [project:: Green Lappe Launch] [epic:: Owner discovery proof sprint] [feature:: Warm-owner list] [priority:: P0] [owner:: Megan] [depends:: GLP-T001] #green-lappe/launch 🔺 ⏳ 2026-05-25 📅 2026-05-28
  - [ ] Add recent sellers who may retain a property [id:: GLP-T201] [depends:: GLP-T200] [priority:: P0] #green-lappe/launch 🔺 ⏳ 2026-05-25 📅 2026-05-26
  - [ ] Add current owners relocating out of area [id:: GLP-T202] [depends:: GLP-T200] [priority:: P0] #green-lappe/launch 🔺 ⏳ 2026-05-25 📅 2026-05-26
  - [ ] Add referral partners [id:: GLP-T203] [depends:: GLP-T200] [priority:: P1] #green-lappe/launch ⏫ ⏳ 2026-05-26 📅 2026-05-27
  - [ ] Tag each contact by source and likely timing [id:: GLP-T204] [depends:: GLP-T201, GLP-T202, GLP-T203] [priority:: P1] #green-lappe/launch ⏫ ⏳ 2026-05-28 📅 2026-05-28
- [!] Schedule first 10 owner discovery conversations [id:: GLP-T210] [project:: Green Lappe Launch] [epic:: Owner discovery proof sprint] [feature:: 20 owner conversations] [priority:: P0] [owner:: Megan] [depends:: GLP-T130, GLP-T200] #green-lappe/launch #blocked/external 🔺 ⏳ 2026-06-01 📅 2026-06-02
- [!] Complete first 10 owner discovery conversations [id:: GLP-T220] [project:: Green Lappe Launch] [epic:: Owner discovery proof sprint] [feature:: 20 owner conversations] [priority:: P0] [owner:: Megan] [depends:: GLP-T210] #green-lappe/launch #blocked/external 🔺 ⏳ 2026-06-02 📅 2026-06-05
  - [ ] Capture current management situation [id:: GLP-T221] [depends:: GLP-T220] [priority:: P0] #green-lappe/launch 🔺 ⏳ 2026-06-02 📅 2026-06-05
  - [ ] Capture top pain and trust proof needed [id:: GLP-T222] [depends:: GLP-T220] [priority:: P0] #green-lappe/launch 🔺 ⏳ 2026-06-02 📅 2026-06-05
  - [ ] Capture pricing reaction [id:: GLP-T223] [depends:: GLP-T220] [priority:: P0] #green-lappe/launch 🔺 ⏳ 2026-06-02 📅 2026-06-05
- [!] Complete second 10 owner discovery conversations [id:: GLP-T230] [project:: Green Lappe Launch] [epic:: Owner discovery proof sprint] [feature:: 20 owner conversations] [priority:: P0] [owner:: Megan] [depends:: GLP-T220] #green-lappe/launch #blocked/external 🔺 ⏳ 2026-06-05 📅 2026-06-09
- [ ] Score discovery results [id:: GLP-T240] [project:: Green Lappe Launch] [epic:: Owner discovery proof sprint] [feature:: Prospect scoring and pricing signal] [priority:: P0] [owner:: Kevin/Megan] [depends:: GLP-T220, GLP-T230] #green-lappe/launch 🔺 ⏳ 2026-06-09 📅 2026-06-10
  - [ ] Score fit from 1 to 5 [id:: GLP-T241] [depends:: GLP-T240] [priority:: P0] #green-lappe/launch 🔺 ⏳ 2026-06-09 📅 2026-06-10
  - [ ] Score timing from 1 to 5 [id:: GLP-T242] [depends:: GLP-T240] [priority:: P0] #green-lappe/launch 🔺 ⏳ 2026-06-09 📅 2026-06-10
  - [ ] Score legal and operational complexity [id:: GLP-T243] [depends:: GLP-T240] [priority:: P0] #green-lappe/launch 🔺 ⏳ 2026-06-09 📅 2026-06-10
- [ ] Decide launch pricing posture from discovery evidence [id:: GLP-T250] [project:: Green Lappe Launch] [epic:: Owner discovery proof sprint] [feature:: Prospect scoring and pricing signal] [priority:: P0] [owner:: Kevin/Megan] [depends:: GLP-T240] #green-lappe/launch 🔺 ⏳ 2026-06-10 📅 2026-06-11
- [ ] Choose top owner trust proof [id:: GLP-T260] [project:: Green Lappe Launch] [epic:: Owner discovery proof sprint] [feature:: Prospect scoring and pricing signal] [priority:: P0] [owner:: Kevin/Megan] [depends:: GLP-T240] #green-lappe/launch 🔺 ⏳ 2026-06-10 📅 2026-06-11

## First-cohort operations

- [!] Shortlist 2-5 possible first-cohort properties [id:: GLP-T300] [project:: Green Lappe Launch] [epic:: First-cohort operations] [feature:: First-cohort acceptance rules] [priority:: P1] [owner:: Kevin/Megan] [depends:: GLP-T240, GLP-T900] #green-lappe/launch #blocked/external ⏫ ⏳ 2026-06-10 📅 2026-06-12
- [!] Draft first-cohort onboarding checklist [id:: GLP-T310] [project:: Green Lappe Launch] [epic:: First-cohort operations] [feature:: First-cohort acceptance rules] [priority:: P1] [owner:: Kevin/Megan] [depends:: GLP-T300] #green-lappe/launch #blocked/external ⏫ ⏳ 2026-06-11 📅 2026-06-12
- [!] Draft maintenance SLA and owner approval threshold policy [id:: GLP-T320] [project:: Green Lappe Launch] [epic:: First-cohort operations] [feature:: Maintenance SLA and approval thresholds] [priority:: P1] [owner:: Kevin/Megan/counsel] [depends:: GLP-T150, GLP-T240] #green-lappe/launch #blocked/external ⏫ ⏳ 2026-06-10 📅 2026-06-12
- [!] Build vendor escalation tree [id:: GLP-T330] [project:: Green Lappe Launch] [epic:: First-cohort operations] [feature:: Vendor escalation tree] [priority:: P1] [owner:: Megan] [depends:: GLP-T150] #green-lappe/launch #blocked/external ⏫ ⏳ 2026-06-04 📅 2026-06-12

## Systems proof

- [ ] Define candidate owner-visible systems artifacts [id:: GLP-T400] [project:: Green Lappe Launch] [epic:: Systems proof] [feature:: Owner-visible systems proof] [priority:: P1] [owner:: Kevin] [depends:: GLP-T220] #green-lappe/launch ⏫ ⏳ 2026-06-05 📅 2026-06-08
  - [ ] Define monthly owner packet prototype [id:: GLP-T401] [depends:: GLP-T400] [priority:: P1] #green-lappe/launch ⏫ ⏳ 2026-06-05 📅 2026-06-08
  - [ ] Define maintenance approval workflow prototype [id:: GLP-T402] [depends:: GLP-T400] [priority:: P1] #green-lappe/launch ⏫ ⏳ 2026-06-05 📅 2026-06-08
  - [ ] Define vendor transparency and invoice trail prototype [id:: GLP-T403] [depends:: GLP-T400] [priority:: P1] #green-lappe/launch ⏫ ⏳ 2026-06-05 📅 2026-06-08
- [ ] Choose one owner-visible systems artifact from discovery evidence [id:: GLP-T410] [project:: Green Lappe Launch] [epic:: Systems proof] [feature:: Owner-visible systems proof] [priority:: P1] [owner:: Kevin/Megan] [depends:: GLP-T260, GLP-T400] #green-lappe/launch ⏫ ⏳ 2026-06-10 📅 2026-06-10
- [ ] Build v0.1 of chosen systems artifact [id:: GLP-T420] [project:: Green Lappe Launch] [epic:: Systems proof] [feature:: Owner-visible systems proof] [priority:: P1] [owner:: Kevin] [depends:: GLP-T410] #green-lappe/launch ⏫ ⏳ 2026-06-10 📅 2026-06-12

## Website and public boundary

- [!] Confirm public-copy boundary with counsel [id:: GLP-T500] [project:: Green Lappe Launch] [epic:: Website and public boundary] [feature:: Public copy boundary] [priority:: P0] [owner:: counsel/Megan/Kevin] [depends:: GLP-T130] #green-lappe/launch #blocked/external 🔺 ⏳ 2026-05-29 📅 2026-06-03
- [!] Revalidate domain purchase approval [id:: GLP-T510] [project:: Green Lappe Launch] [epic:: Website and public boundary] [feature:: Domain, DNS, staging, and QA] [priority:: P1] [owner:: account-owner] [depends:: GLP-T500] #green-lappe/launch #blocked/external ⏫ ⏳ 2026-06-03 📅 2026-06-06
- [!] Execute domain purchase evidence runbook if approved [id:: GLP-T520] [project:: Green Lappe Launch] [epic:: Website and public boundary] [feature:: Domain, DNS, staging, and QA] [priority:: P1] [owner:: account-owner] [depends:: GLP-T510] #green-lappe/launch #blocked/external ⏫ ⏳ 2026-06-08 📅 2026-06-09
- [!] Execute DNS and protected-staging runbook if approved [id:: GLP-T530] [project:: Green Lappe Launch] [epic:: Website and public boundary] [feature:: Domain, DNS, staging, and QA] [priority:: P1] [owner:: account-owner/Kevin] [depends:: GLP-T520] #green-lappe/launch #blocked/external ⏫ ⏳ 2026-06-09 📅 2026-06-10
- [!] Draft one-page website and owner intake copy within approved boundary [id:: GLP-T540] [project:: Green Lappe Launch] [epic:: Website and public boundary] [feature:: Public copy boundary] [priority:: P1] [owner:: Kevin/Megan] [depends:: GLP-T250, GLP-T260, GLP-T500] #green-lappe/launch #blocked/external ⏫ ⏳ 2026-06-10 📅 2026-06-12
- [!] Run website QA and release-boundary checklist [id:: GLP-T550] [project:: Green Lappe Launch] [epic:: Website and public boundary] [feature:: Domain, DNS, staging, and QA] [priority:: P1] [owner:: Kevin/Megan] [depends:: GLP-T530, GLP-T540] #green-lappe/launch #blocked/external ⏫ ⏳ 2026-06-12 📅 2026-06-13

## Launch decision

- [!] Complete launch gate review [id:: GLP-T900] [project:: Green Lappe Launch] [epic:: Legal and licensing gates] [feature:: Final go/no-go] [priority:: P0] [owner:: Kevin/Megan/counsel] [depends:: GLP-T124, GLP-T140, GLP-T150, GLP-T160, GLP-T240, GLP-T500] #green-lappe/launch #blocked/external 🔺 ⏳ 2026-06-10 📅 2026-06-12
  - [ ] Decide public launch allowed [id:: GLP-T901] [depends:: GLP-T900] [priority:: P0] #green-lappe/launch 🔺 ⏳ 2026-06-12 📅 2026-06-12
  - [ ] Decide private readiness only [id:: GLP-T902] [depends:: GLP-T900] [priority:: P0] #green-lappe/launch 🔺 ⏳ 2026-06-12 📅 2026-06-12
  - [ ] Decide hold or no-go [id:: GLP-T903] [depends:: GLP-T900] [priority:: P0] #green-lappe/launch 🔺 ⏳ 2026-06-12 📅 2026-06-12
- [!] Execute approved 2026-06-15 launch, readiness, or hold path [id:: GLP-T910] [project:: Green Lappe Launch] [epic:: Legal and licensing gates] [feature:: Final go/no-go] [priority:: P0] [owner:: Kevin/Megan/account-owner] [depends:: GLP-T900, GLP-T550] #green-lappe/launch #blocked/external 🔺 ⏳ 2026-06-15 📅 2026-06-15

## Review query

```tasks
not done
path includes 2026-05-23-green-lappe-taskforge-repository
sort by due
sort by priority
```
