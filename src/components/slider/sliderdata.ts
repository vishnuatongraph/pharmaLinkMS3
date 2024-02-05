import maledoctor from "../../../public/images/maledoctor.svg";
import femaledoctor from "../../../public/images/femaledoctor.svg";
import circlesmile from "../../../public/images/circlesmile.svg";
import eyecross from "../../../public/images/eyecross.svg";
import group from "../../../public/images/group.svg";
import arrow from "../../../public/images/arrow.svg";
import check from "../../../public/images/check.svg";
import Lesliedoctor from "../../../public/images/Lesliedoctor.svg";
import graph from "../../../public/images/graph.svg";
import rating from "../../../public/images/rating.svg";
import doctorsgroup from "../../../public/images/doctorsgroup.svg";

import monthlyincome from "../../../public/images/monthlyincome.svg";
import workinghour from "../../../public/images/workinghour.svg";
import ratingwitheclips from "../../../public/images/ratingwitheclips.svg";
import counter from "../../../public/images/counter.svg";

export const SliderPage1 = {
  image: maledoctor,
  leftImage: circlesmile,
  rightImage: eyecross,
  heading: "Your time. Your money",
  paragraph:
    "Don't share your hourly rate with someone else & lose your power of negotiation.",
};

export const SliderPage2 = [
  {
    image: group,
    heading: "Who we are?",
    paragraph:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here.",
  },
  {
    image: arrow,
    heading: "Our mission towards the Pharmacy owners",
    paragraph:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here.",
    listData: [
      {
        listImage: check,
        label:
          "We charge a fixed monthly fee giving you access to our platform and our services.",
      },
      {
        listImage: check,
        label:
          "The rest is in your hands; you can create the connections needed for your business success, based on your individual needs.",
      },
    ],
  },
];

export const bottomdata = {
  subImage: doctorsgroup,
  subParagraph: "Join the 17,000+ Pharmacist in Pharmalink platfrom",
};

export const SliderPage3 = {
  image: femaledoctor,
  subImage: Lesliedoctor,
  backgroundImage: graph,
  rating: rating,
  heading: "Leslie Alexander",
  subHeading: "Pharmacist",
  paragraph:
    "“Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.”",

  groupdata: [
    {
      image: monthlyincome,
      className: "absolute right-0 -top-10",
    },
    {
      image: workinghour,
      className: "absolute -left-10 -top-10",
    },
    {
      image: ratingwitheclips,
      className: "absolute -right-14 bottom-10",
    },
    {
      image: counter,
      className: "absolute left-10 -bottom-6",
    },
  ],
};
