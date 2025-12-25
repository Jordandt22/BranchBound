import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Utils
import { CARD_STYLES_NO_HOVER } from "@/lib/constants/styles";
import { SIXTEEN_TO_NINE } from "@/lib/constants/aspectRatios";
import { getStoryImageURL } from "@/lib/utils";

function StorySection({ story }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-[85%] md:w-1/2 space-y-6 mb-12"
    >
      {/* Story Image Card */}
      <div
        className={`${CARD_STYLES_NO_HOVER} overflow-hidden group shadow-card border-none`}
      >
        <div className="relative w-full h-[30vh] aspect-video rounded-t-3xl overflow-hidden">
          <Image
            src={getStoryImageURL(story.slug, SIXTEEN_TO_NINE)}
            alt={story.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-5"
            sizes="(max-width: 1024px) 100vw, 30vw"
          />

          <div className="absolute top-0 bottom-0 left-0 right-0 bg-linear-to-t from-black/90 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-white text-xl font-bold mb-2">{story.title}</h3>
            <p className=" text-white/80 text-sm leading-relaxed line-clamp-2 md:line-clamp-4">
              {story.short_desc}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default StorySection;
