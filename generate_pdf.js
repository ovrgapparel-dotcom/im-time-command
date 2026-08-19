const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

function buildPdf(){
  const doc = new PDFDocument({
    margin: 40,
    size: 'A4'
  });

  const pdfPath = path.join(__dirname, 'iM_Time_Command_User_Guide.pdf');
  const writeStream = fs.createWriteStream(pdfPath);
  doc.pipe(writeStream);

  const primaryBlue = '#3B82F6';
  const darkBg = '#0F172A';
  const textDark = '#1E293B';
  const textMute = '#64748B';

  // ---- PAGE 1: COVER & OVERVIEW ----
  doc.rect(40, 40, 515, 140).fill(darkBg);
  
  doc.fillColor('#FFFFFF').fontSize(24).font('Helvetica-Bold').text('iM TIME COMMAND', 60, 65);
  doc.fillColor(primaryBlue).fontSize(11).font('Helvetica-Bold').text('GLOBAL ENTREPRENEUR SUITE — OFFICIAL USER GUIDE', 60, 95);
  doc.fillColor('#94A3B8').fontSize(9).font('Helvetica').text('Version 4.0  |  Live Suite: https://im-time-command.vercel.app', 60, 115);
  doc.fillColor('#64748B').fontSize(8).text('GitHub Repository: github.com/ovrgapparel-dotcom/im-time-command', 60, 130);

  doc.moveDown(5);

  // Executive Description Paragraph
  doc.fillColor(primaryBlue).fontSize(13).font('Helvetica-Bold').text('Executive Suite Description', 40, 205);
  doc.lineWidth(1).strokeColor(primaryBlue).moveTo(40, 222).lineTo(555, 222).stroke();

  const descText = "iM Time Command is an all-in-one Global Entrepreneur Suite designed to streamline cross-border time zone management, strategic calendar planning, client and collaborator relationship velocity, and business growth tracking into a single unified platform. Featuring a real-time Partner Clock Strip with contact method shortcuts (Call, WhatsApp, Email, Google Meet, Messenger), a 2-column drag-and-drop Agenda Planner, an Actionable Milestone Journey with XP gamification across 4 core business growth stages, an AI Smart Reply & Gmail inbox integration, and a dedicated Calendar & Booking Hub, iM Time Command empowers international entrepreneurs, agency owners, and remote teams to execute with precision across time zones, maximize meeting efficiency, and track focus analytics without subscription complexity.";

  doc.fillColor(textDark).fontSize(9.5).font('Helvetica').text(descText, 40, 235, {
    width: 515,
    align: 'justify',
    lineGap: 4
  });

  doc.moveDown(2);

  // Section 1: Core Architecture
  doc.fillColor(primaryBlue).fontSize(12).font('Helvetica-Bold').text('1. Core Modules & Architecture', 40, 350);
  doc.lineWidth(0.5).strokeColor('#CBD5E1').moveTo(40, 365).lineTo(555, 365).stroke();

  const modules = [
    { title: 'Agenda Planner & Grid', desc: 'Drag-and-drop calendar planner supporting Day and Week views, drag-to-duplicate (Ctrl/⌘+drag), bottom-edge time resizing, and instant .ics calendar exports.' },
    { title: 'Global Time Command & Partner Strip', desc: 'Real-time partner clock strip displaying live local times, working hours status (Available, Off Hours, Weekend), and preferred contact methods.' },
    { title: 'Collaborator & Client Directory', desc: 'Searchable directory supporting unlimited contacts with CSV & VCF (Phone Contacts) file import/export and 1-click meeting scheduling.' },
    { title: 'Planner Metrics & Performance Analytics', desc: 'Live KPI cards and interactive charts tracking total meeting hours, meeting density by weekday, warm-up prep buffer, cool-down buffer time, and focus balance.' },
    { title: 'Actionable Milestone Journey & Growth Tracker', desc: 'Gamified entrepreneur growth engine featuring 4 stages, 12 actionable sub-tasks with XP rewards (+15 to +50 XP), progress tracking, and custom task creation.' },
    { title: 'Smart Reply Engine & Gmail Inbox', desc: '10 platform messaging shortcuts, contextual AI reply generators (Formal, Friendly, Direct), and full Google OAuth 2.0 Gmail inbox integration.' }
  ];

  let y = 375;
  modules.forEach(m => {
    doc.fillColor(darkBg).fontSize(9).font('Helvetica-Bold').text(`• ${m.title}: `, 45, y, { continued: true });
    doc.fillColor(textMute).font('Helvetica').text(m.desc, { width: 490 });
    y = doc.y + 6;
  });

  // Footer Page 1
  doc.fillColor('#94A3B8').fontSize(8).text('Page 1 of 2  —  iM Time Command User Guide', 40, 780, { align: 'center' });

  // ---- PAGE 2: USER GUIDE & STEP-BY-STEP ----
  doc.addPage();

  doc.fillColor(primaryBlue).fontSize(13).font('Helvetica-Bold').text('2. Step-by-Step Feature Walkthrough', 40, 40);
  doc.lineWidth(1).strokeColor(primaryBlue).moveTo(40, 57).lineTo(555, 57).stroke();

  const steps = [
    { num: 'Step 1', title: 'Setting Up Your Profile & Primary Time Zone', body: 'Open Settings (gear icon in header) to set your name, business handle, primary time zone, and preferred notification lead time (e.g. 15 mins before meetings).' },
    { num: 'Step 2', title: 'Managing Collaborators & Importing Phone Contacts', body: 'Click "Directory" or "Add Contact" in the clock strip. Add contacts manually or upload any .csv or phone contacts .vcf file. Search contacts by city, country, or name.' },
    { num: 'Step 3', title: 'Scheduling Meetings & Calculating Time Overlaps', body: 'Click "Schedule Meeting" on any contact card in the Directory or Partner Availability sidebar. The Event Modal will auto-prefill the contact, title, and calculate their local time offset.' },
    { num: 'Step 4', title: 'Optimizing Schedule Buffers & Focus Analytics', body: 'Scroll to the Planner Metrics panel under the agenda grid. Review your Warm-Up prep and Cool-Down recovery buffer averages to ensure healthy meeting pace without burnout.' },
    { num: 'Step 5', title: 'Executing the Actionable Milestone Journey', body: 'Navigate to the Growth tab. Complete actionable tasks under Offer Validation, Client Acquisition, Systems & SOPs, and Scaling. Check boxes to earn XP and level up.' },
    { num: 'Step 6', title: 'Generating Google Meet & Booking Links', body: 'Switch to the Cal Hub tab to store master Calendly links or generate instant Google Calendar events with pre-configured Google Meet video links.' }
  ];

  let y2 = 70;
  steps.forEach(s => {
    doc.fillColor(darkBg).fontSize(9.5).font('Helvetica-Bold').text(`${s.num}: ${s.title}`, 40, y2);
    y2 += 14;
    doc.fillColor(textMute).fontSize(8.5).font('Helvetica').text(s.body, 55, y2, { width: 495, lineGap: 3 });
    y2 = doc.y + 10;
  });

  // Summary Table of Contact Shortcuts
  doc.fillColor(primaryBlue).fontSize(12).font('Helvetica-Bold').text('3. Supported Contact Method Shortcuts', 40, y2 + 10);
  doc.lineWidth(0.5).strokeColor('#CBD5E1').moveTo(40, y2 + 25).lineTo(555, y2 + 25).stroke();

  const contactTable = [
    ['Contact Method', 'URL Protocol / Format', 'Action'],
    ['Phone / Call', 'tel:+1234567890', 'Initiates phone dialer'],
    ['WhatsApp', 'https://wa.me/1234567890', 'Opens direct WhatsApp chat'],
    ['Google Meet', 'https://meet.google.com/new', 'Launches video meeting room'],
    ['Email / Gmail', 'mailto:partner@domain.com', 'Opens default mail client'],
    ['Messenger', 'https://m.me/username', 'Opens Facebook Messenger chat'],
    ['Telegram / Signal', 'https://t.me/username', 'Opens direct Telegram message']
  ];

  let ty = y2 + 35;
  contactTable.forEach((row, idx) => {
    const isHeader = idx === 0;
    doc.rect(40, ty, 515, 18).fill(isHeader ? darkBg : (idx % 2 === 0 ? '#F8FAFC' : '#FFFFFF'));
    doc.fillColor(isHeader ? '#FFFFFF' : textDark).fontSize(8.5).font(isHeader ? 'Helvetica-Bold' : 'Helvetica');
    doc.text(row[0], 50, ty + 4, { width: 140 });
    doc.text(row[1], 200, ty + 4, { width: 180 });
    doc.text(row[2], 390, ty + 4, { width: 150 });
    ty += 18;
  });

  // Footer Page 2
  doc.fillColor('#94A3B8').fontSize(8).text('Page 2 of 2  —  iM Time Command User Guide  |  https://im-time-command.vercel.app', 40, 780, { align: 'center' });

  doc.end();

  writeStream.on('finish', () => {
    console.log('PDF generated successfully:', pdfPath);
  });
}

buildPdf();
