"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportOptions } from "@/lib/animations";
import SectionContainer from "@/components/ui/section-container";

const problemSignals = [
  {
    stat: "Unverified execution",
    detail: (
      <>
        Too many projects begin with{" "}
        <strong className="font-medium text-foreground">
          unverified operators and informal agreements
        </strong>
        , creating avoidable risk before work even starts.
      </>
    ),
  },
  {
    stat: "Payment without proof",
    detail: (
      <>
        Funds are often released without reliable evidence that milestones were
        met, which leads to{" "}
        <strong className="font-medium text-foreground">
          cost overruns, scope drift, and stalled delivery
        </strong>
        .
      </>
    ),
  },
  {
    stat: "Visibility that arrives late",
    detail: (
      <>
        Updates typically arrive after issues compound, when{" "}
        <strong className="font-medium text-foreground">
          timelines, quality, and accountability are already compromised
        </strong>
        .
      </>
    ),
  },
];

export default function Problem() {
  return (
    <SectionContainer
      id="problem"
      className="bg-white"
      ariaLabelledby="problem-heading"
    >
      <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
        <motion.div
          className="lg:col-span-5"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <p className="text-sm font-medium tracking-[0.04em] text-muted-foreground/80">
            Why We Exist
          </p>
          <h2 id="problem-heading" className="mt-5 max-w-xl">
            Capital moves globally. Execution risk stays local.
          </h2>
        </motion.div>

        <motion.div
          className="lg:col-span-7"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <div className="border-l-2 border-[#d7b740] pl-6 md:pl-8">
            <p className="max-w-2xl text-xl leading-9 text-foreground md:text-2xl">
              Most failures are not caused by weak demand. They come from weak
              execution controls after funds are already committed.
            </p>
          </div>
          <p className="mt-8 max-w-2xl text-base text-muted-foreground">
            HomeTrust Africa addresses this through diaspora project oversight
            and managed local execution.
          </p>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            A common pattern is payment release before verified milestone
            evidence, followed by delayed issue visibility and costly rework.
          </p>
        </motion.div>
      </div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="mt-18 md:mt-20"
      >
        <p className="max-w-2xl text-[1.02rem] leading-8 text-muted-foreground">
          Serious projects need governance at the point of execution: verified
          operators, controlled milestone approvals, and reporting that supports
          timely decisions.
        </p>

        <div className="mt-10 border-t border-[#ddd0cb]">
          {problemSignals.map((item, index) => (
            <motion.div
              key={item.stat}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              transition={{ delay: index * 0.05 }}
              className={`grid gap-4 py-7 md:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] md:items-start md:gap-12 md:py-8 ${
                index !== problemSignals.length - 1
                  ? "border-b border-[#ddd0cb]"
                  : ""
              }`}
            >
              <p className="max-w-50 text-[1.32rem] font-semibold leading-[1.2] text-foreground md:text-[1.45rem]">
                {item.stat}
              </p>
              <p className="max-w-2xl text-[0.96rem] leading-7 text-muted-foreground">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionContainer>
  );
}
