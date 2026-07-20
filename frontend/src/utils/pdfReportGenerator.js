import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function generateEcoReportPDF(reportData, userName = 'Eco Traveler') {
  const doc = new jsPDF();
  const primaryColor = [46, 125, 50]; // #2E7D32

  // Header Banner
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 35, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('GreenRoute AI', 14, 18);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Eco-Friendly Travel & CO2 Reduction Sustainability Report', 14, 26);

  // User & Date Metadata
  doc.setTextColor(50, 50, 50);
  doc.setFontSize(10);
  doc.text(`User: ${userName}`, 14, 45);
  doc.text(`Report Period: ${(reportData.timeframe || 'weekly').toUpperCase()}`, 14, 52);
  doc.text(`Generated On: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 130, 45);
  doc.text(`Green Badge: ${reportData.greenBadge || 'Sustainability Leader'}`, 130, 52);

  // Metrics Box
  doc.setFillColor(232, 245, 233);
  doc.roundedRect(14, 58, 182, 38, 3, 3, 'F');

  doc.setTextColor(46, 125, 50);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Key Environmental Metrics Summary', 20, 68);

  doc.setFontSize(10);
  doc.setTextColor(40, 40, 40);
  doc.setFont('helvetica', 'normal');
  doc.text(`• Total Trips Completed: ${reportData.totalTrips}`, 20, 77);
  doc.text(`• Fuel Conserved: ${reportData.fuelSavedLiters} Liters / kWh`, 20, 85);
  doc.text(`• Money Saved: RS. ${reportData.moneySavedInr}`, 110, 77);
  doc.text(`• CO2 Reduced: ${reportData.co2ReducedKg} kg CO2`, 110, 85);
  doc.text(`• Trees Saved Equivalent: ${reportData.treesSaved} Trees`, 110, 91);

  // Table of Trips
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(46, 125, 50);
  doc.text('Detailed Eco Trip Log', 14, 106);

  const tableRows = (reportData.tripDetails || []).map((t, idx) => [
    idx + 1,
    t.source,
    t.destination,
    `${t.distance_km || 0} km`,
    `${t.co2_saved_kg || 0} kg`,
    `RS. ${t.money_saved_inr || 0}`,
    `${t.eco_score || 85}/100`
  ]);

  doc.autoTable({
    startY: 112,
    head: [['#', 'Source', 'Destination', 'Distance', 'CO2 Saved', 'Money Saved', 'Eco Score']],
    body: tableRows,
    headStyles: { fillColor: primaryColor, textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [245, 247, 250] },
    margin: { left: 14, right: 14 }
  });

  // Footer note
  const finalY = doc.lastAutoTable.finalY || 180;
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text('GreenRoute AI - Drive Smarter, Travel Greener. Powered by AI & ClimateTech Analytics.', 14, finalY + 15);

  doc.save(`GreenRoute_AI_${reportData.timeframe || 'eco'}_Report.pdf`);
}
