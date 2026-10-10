import type { ProductSummary } from '~/types/product'

// Local Fake Store samples for the grid; API integration will replace this fixture.
export const sampleProducts = [
  {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    image: '/images/product-list/sample-1.png'
  },
  {
    id: 2,
    title: 'Mens Casual Premium Slim Fit T-Shirts',
    image: '/images/product-list/sample-2.png'
  },
  {
    id: 3,
    title: 'Mens Cotton Jacket',
    image: '/images/product-list/sample-3.png'
  },
  {
    id: 4,
    title: 'Mens Casual Slim Fit',
    image: '/images/product-list/sample-4.png'
  },
  {
    id: 5,
    title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    image: '/images/product-list/sample-5.png'
  },
  {
    id: 6,
    title: 'Solid Gold Petite Micropave',
    image: '/images/product-list/sample-6.png'
  },
  {
    id: 7,
    title: 'White Gold Plated Princess',
    image: '/images/product-list/sample-7.png'
  },
  {
    id: 8,
    title: 'Pierced Owl Rose Gold Plated Stainless Steel Double',
    image: '/images/product-list/sample-8.png'
  },
  {
    id: 9,
    title: 'WD 2TB Elements Portable External Hard Drive - USB 3.0',
    image: '/images/product-list/sample-9.png'
  },
  {
    id: 10,
    title: 'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s',
    image: '/images/product-list/sample-10.png'
  },
  {
    id: 11,
    title: 'Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5',
    image: '/images/product-list/sample-11.png'
  },
  {
    id: 12,
    title: 'WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive',
    image: '/images/product-list/sample-12.png'
  },
  {
    id: 13,
    title: 'Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin',
    image: '/images/product-list/sample-13.png'
  },
  {
    id: 14,
    title:
      'Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED',
    image: '/images/product-list/sample-14.png'
  },
  {
    id: 15,
    title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    image: '/images/product-list/sample-15.png'
  },
  {
    id: 16,
    title: "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    image: '/images/product-list/sample-16.png'
  },
  {
    id: 17,
    title: 'Rain Jacket Women Windbreaker Striped Climbing Raincoats',
    image: '/images/product-list/sample-17.png'
  },
  {
    id: 18,
    title: "MBJ Women's Solid Short Sleeve Boat Neck V",
    image: '/images/product-list/sample-18.png'
  }
] as const satisfies readonly ProductSummary[]
