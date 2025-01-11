import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineIcon,
    Typography,
    TimelineHeader,
  } from "@material-tailwind/react";
  import {
    ArchiveBoxIcon,
    CurrencyDollarIcon,
    DocumentCheckIcon,
  } from "@heroicons/react/24/solid";
   
  export function TimeLinePurchase() {
    return (
      <div className="w-full">
        <Timeline className="flex-row justify-between flex-wrap">
        
            <TimelineItem className="h-28">
                <TimelineConnector className="!w-[78px]" />
                <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-gray-400 py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                <TimelineIcon className="p-3" >
                    <DocumentCheckIcon class="h-6 w-6 text-gray-500" />
                </TimelineIcon>
                <div className="flex flex-col gap-1">
                    <Typography variant="h6" color="blue-black">
                        Revisar compra
                    </Typography>
                </div>
                </TimelineHeader>
            </TimelineItem>
        </Timeline>
      </div>
    );
  }