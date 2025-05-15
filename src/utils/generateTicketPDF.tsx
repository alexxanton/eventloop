import { createRef } from "react";
import { createRoot } from "react-dom/client";
import { CPDFTicket } from "@/components/events/CPDFTicket";
import { Ticket } from "./types/types";

export const generateTicketPDF = async (ticket: Ticket) => {
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px";
  document.body.appendChild(container);

  const ticketRef = createRef<HTMLDivElement>();
  const root = createRoot(container);
  root.render(
    <div ref={ticketRef}>
      <CPDFTicket ticket={ticket} />
    </div>
  );

  try {
    const { default: html2canvas } = await import("html2canvas");
    const { default: jsPDF } = await import("jspdf");

    const canvas = await html2canvas(ticketRef.current!, {
      scale: 2,
      backgroundColor: null,
    });

    const pdf = new jsPDF("l", "mm", "a4");
    const imgData = canvas.toDataURL("image/png");
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`ticket-${ticket.ticket_number}.pdf`);

  } finally {
    root.unmount();
    document.body.removeChild(container);
  }
};
