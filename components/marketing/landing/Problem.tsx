"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportOptions } from "@/lib/animations";
import SectionContainer from "@/components/ui/section-container";

const problemSignals = [
  {
    stat: "High Fraud Risk",
    detail: (
      <>
        Diaspora members sending money back home face constant threats of{" "}
        <strong className="font-medium text-foreground">
          fraudulent schemes and misappropriation of funds
        </strong>{" "}
        by unverified intermediaries.
      </>
    ),
  },
  {
    stat: "Lack of Oversight",
    detail: (
      <>
        Without local presence,{" "}
        <strong className="font-medium text-foreground">
          monitoring project progress becomes nearly impossible
        </strong>
        . You&apos;re left hoping for updates and trusting strangers with your
        investments.
      </>
    ),
  },
  {
    stat: "No Transparency",
    detail: (
      <>
        Most intermediaries lack{" "}
        <strong className="font-medium text-foreground">
          proper documentation, legal oversight, and accountability measures
        </strong>
        , leaving your projects vulnerable.
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
            Building back home should not feel like sending capital into the dark.
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
              Diaspora families and investors are willing to build, launch, and
              invest. What they often lack is a dependable operating layer that
              makes local execution visible, structured, and accountable.
            </p>
          </div>
          <p className="mt-8 max-w-2xl text-base text-muted-foreground">
            HomeTrust Africa exists because too many important projects still
            depend on informal coordination, weak verification, and updates that
            arrive too late to change outcomes.
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
          The pattern is consistent: when serious projects move forward without
          verified local oversight, the same risks appear early.
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
              <p className="max-w-[12.5rem] text-[1.32rem] font-semibold leading-[1.2] text-foreground md:text-[1.45rem]">
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
