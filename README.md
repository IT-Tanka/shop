# My Backpack Theme - Test Assignment

This is a custom Shopify theme developed as a test assignment, built on the [Shopify Skeleton Theme](https://github.com/Shopify/skeleton-theme) as a starting foundation. The theme has been extended with unique features and modifications tailored to the task requirements.

## Implemented Features
- **Swiper Gallery**: Integrated a responsive product gallery with configurable settings (slides per view, pagination, arrows, and spacing) managed through Shopify schema.
- **Product Filtering**: Added color-based filtering for product images based on variant selection.
- **Dynamic Accordion**: Implemented an accordion component with content managed via product metafields (`accordion_blocks`).
  - Content is defined in JSON format with `title` and `content` fields.
  - Includes a check to hide empty accordion items.
  - Supports toggling between single or multiple open items via a schema setting.
- **Responsive Design**: Optimized layouts for mobile, tablet, and desktop devices.

## Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/IT-Tanka/my-backpack-theme.git
