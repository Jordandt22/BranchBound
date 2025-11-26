import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { InfoIcon } from "lucide-react";

// Utils
import { CARD_STYLES_NO_HOVER } from "@/lib/constants/styles";
import { FOUR_TO_FIVE } from "@/lib/constants/aspectRatios";
import { getStoryImageURL } from "@/lib/utils";

function StorySection({ story }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full lg:w-[30%] space-y-6"
    >
      {/* Story Image Card */}
      <div className={`${CARD_STYLES_NO_HOVER} overflow-hidden group`}>
        <div className="relative w-full aspect-[4/5] rounded-t-3xl overflow-hidden">
          <Image
            src={getStoryImageURL(story.slug, FOUR_TO_FIVE)}
            alt={story.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-5"
            sizes="(max-width: 1024px) 100vw, 30vw"
          />

          <div className="absolute top-0 bottom-0 left-0 right-0 bg-linear-to-t from-black/90 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-white text-xl font-bold mb-2">{story.title}</h3>
            <p className="text-white/80 text-sm leading-relaxed line-clamp-5">
              {story.short_desc}
            </p>
          </div>
        </div>
      </div>

      <Link
        href={`/story/${story.slug}`}
        className="w-full flex items-center justify-center rounded-full bg-surface/80 border-2 border-surface-hover text-white font-semibold py-2 text-md transition-all duration-300 cursor-pointer hover:scale-95 hover:bg-accent-secondary hover:border-accent-secondary"
      >
        <InfoIcon size={20} className="mr-2" />
        View Story
      </Link>
    </motion.div>
  );
}

export default StorySection;
