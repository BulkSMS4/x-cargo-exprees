import { createFileRoute } from "@tanstack/react-router";

const shipments = [
  {
    tracking_number: "XCARGO123456789UK",
    status: "In Transit",
    location: "London, UK",
    estimated_delivery: "2026-06-05",
  },
  {
    tracking_number: "XCARGO987654321US",
    status: "Delivered",
    location: "New York, USA",
    estimated_delivery: "2026-06-01",
  },
];

export const Route = createFileRoute(
  "/api/track/$trackingNumber"
)({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const shipment = shipments.find(
          s => s.tracking_number === params.trackingNumber
        );

        if (!shipment) {
          return Response.json(
            { error: "Tracking number not found" },
            { status: 404 }
          );
        }

        return Response.json(shipment);
      },
    },
  },
});
