import { createRef } from "react";
import { createRoot } from "react-dom/client";
import { CPDFTicket } from "@/components/events/CPDFTicket";
import { Ticket } from "./types/types";

export const generateTicketPDF = async (
  tickets: Ticket[],
  onProgress?: (index: number) => void
) => {
  const pdf = new (await import("jspdf")).default("l", "mm", "a4");
  const { default: html2canvas } = await import("html2canvas");

  for (const [index, ticket] of tickets.entries()) {
    onProgress?.(index);

    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "-9999px";
    document.body.appendChild(container);

    const ticketRef = createRef<HTMLDivElement>();
    const root = createRoot(container);

    await new Promise<void>((resolve) => {
      root.render(
        <div ref={ticketRef}>
          <CPDFTicket ticket={ticket} />
        </div>
      );
      setTimeout(resolve, 100);
    });

    const canvas = await html2canvas(ticketRef.current!, {
      scale: 2,
      backgroundColor: null,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    if (index > 0) {
      pdf.addPage();
    }

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    root.unmount();
    document.body.removeChild(container);
  }

  pdf.save(`tickets-${Date.now()}.pdf`);
};

