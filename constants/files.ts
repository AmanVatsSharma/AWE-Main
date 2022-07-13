import { IconHome, IconUser, IconMessage } from '@tabler/icons-react';
import { title } from "process";

export const heroSlider = {
    Slides: [
        {
            imgUrlDesktop: "https://cdn.prod.website-files.com/605826c62e8de87de744596e/63f5e30a4d577354fdfce512_Duotone-Master-ssssFile-copy.jpg",
            imgUrlMobile: '',
            title: 'Slide 1',
            description: 'Description 1',
            buttonText: 'Button 1',
        },
        {
            imgUrlDesktop: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/a50a13168411771.644ea2a6b2810.jpg",
            imgUrlMobile: '',
            title: 'Slide 2',
            description: 'Description 2',
            buttonText: 'Button 2',
        }
    ],
};

interface Category {
    name: String,
    description?: String,
    imgUrl?: String,
}

export const Categories: Category[] = [
    {
        name: 'category 1',
        description: '',
        imgUrl: 'https://pre-live-admin.balwaan.com/uploads/media/2023/thumb-md/Harvesting.jpg',
    },
    {
        name: 'category 2',
        description: '',
        imgUrl: 'https://pre-live-admin.balwaan.com/uploads/media/2023/thumb-md/Land_preparation.jpg',
    },
    {
        name: 'category 3',
        description: '',
        imgUrl: 'https://pre-live-admin.balwaan.com/uploads/media/2023/thumb-md/Professional_Gardening.jpg',
    },

]



export const products = [
    {
        title: 'product 01',
        price: 5,
        imgurl: '',
        mrp: 10
    },
    {
        title: 'product 02',
        price: 9,
        imgurl: '',
        mrp: 20
    },
    {
        title: 'product 03',
        price: 15,
        imgurl: '',
        mrp: 35
    },
    {
        title: 'product 04',
        price: 99,
        imgurl: '',
        mrp: 189
    },
]

export const heroParallexProducts = [
    {
        title: "Moonbeam",
        link: "https://gomoonbeam.com",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
    },
    {
        title: "Cursor",
        link: "https://cursor.so",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/cursor.png",
    },
    {
        title: "Rogue",
        link: "https://userogue.com",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/rogue.png",
    },

    {
        title: "Editorially",
        link: "https://editorially.org",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/editorially.png",
    },
    {
        title: "Editrix AI",
        link: "https://editrix.ai",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/editrix.png",
    },
    {
        title: "Pixel Perfect",
        link: "https://app.pixelperfect.quest",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
    },

    {
        title: "Algochurn",
        link: "https://algochurn.com",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
    },
    {
        title: "Aceternity UI",
        link: "https://ui.aceternity.com",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
    },
    {
        title: "Tailwind Master Kit",
        link: "https://tailwindmasterkit.com",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
    },
    {
        title: "SmartBridge",
        link: "https://smartbridgetech.com",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
    },
    {
        title: "Renderwork Studio",
        link: "https://renderwork.studio",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
    },

    {
        title: "Creme Digital",
        link: "https://cremedigital.com",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
    },
    {
        title: "Golden Bells Academy",
        link: "https://goldenbellsacademy.com",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
    },
    {
        title: "Invoker Labs",
        link: "https://invoker.lol",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/invoker.png",
    },
    {
        title: "E Free Invoice",
        link: "https://efreeinvoice.com",
        thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
    },
];

export const testimonials = [
    {
        quote:
            "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
        name: "Charles Dickens",
        title: "A Tale of Two Cities",
    },
    {
        quote:
            "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
        name: "William Shakespeare",
        title: "Hamlet",
    },
    {
        quote: "All that we see or seem is but a dream within a dream.",
        name: "Edgar Allan Poe",
        title: "A Dream Within a Dream",
    },
    {
        quote:
            "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
        name: "Jane Austen",
        title: "Pride and Prejudice",
    },
    {
        quote:
            "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
        name: "Herman Melville",
        title: "Moby-Dick",
    },
];


