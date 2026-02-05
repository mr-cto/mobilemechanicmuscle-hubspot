# Live Site Structure - Reverse Engineered

## Key CSS Classes from Live Site

### Service Cards (Offer Cards)

```html
<section class="offer-card card card--light">
  <div class="offer-card__image-wrapper">
    <img class="offer-card__image" src="..." alt="..." loading="lazy" />
  </div>

  <div class="offer-card__content">
    <h3 style="font-size:24px">Service Name</h3>
    <p style="font-size:16px">Service description...</p>
  </div>

  <div class="offer-card__button-wrapper">
    <a href="..." class="button">Book an Appointment</a>
  </div>
</section>
```

### DND Area Structure

```html
<div
  class="row-fluid-wrapper row-depth-1 row-number-X dnd-section 
     dnd_area-row-X-padding 
     dnd_area-row-X-background-color 
     dnd_area-row-X-background-layers"
>
  <div class="row-fluid">
    <div
      class="span12 widget-span widget-type-cell dnd-column"
      data-widget-type="cell"
    >
      <!-- Content here -->
    </div>
  </div>
</div>
```

### Typography (Inline Styles Used)

- H3 headings: `font-size:24px`
- Paragraphs: `font-size:16px`
- All headings: **UPPERCASE** via CSS

### Buttons

```html
<a href="..." class="button">Text</a>
```

Styling:

- Background: `#30beb4` (teal)
- Color: `#ffffff`
- Border: `1px solid #30beb4`
- Padding: `10px 20px`
- Border-radius: `0px` (square)
- Text-transform: `uppercase`
- Font-weight: `600`
- Font-size: `16px`

## External CSS Files

1. **Main Template CSS:**
   `//7052064.fs1.hubspotusercontent-na1.net/hubfs/7052064/hub_generated/template_assets/DEFAULT_ASSET/1768583167769/template_main.min.css`

2. **Offer Card Module:**
   `//7052064.fs1.hubspotusercontent-na1.net/hubfs/7052064/hub_generated/module_assets/1/-47160443984/1768583245266/module_offer-card.min.css`

3. **Logo Grid Module:**
   `//7052064.fs1.hubspotusercontent-na1.net/hubfs/7052064/hub_generated/module_assets/1/-130792639785/1768583275693/module_logo_grid.min.css`

4. **Image Grid Module:**
   `//7052064.fs1.hubspotusercontent-na1.net/hubfs/7052064/hub_generated/module_assets/1/-98251788440/1768583271409/module_image_grid.min.css`

## Color Palette (Actual Usage)

- **Primary (Buttons/Links):** `#30beb4` (teal)
- **Primary Hover:** `#30beb4`
- **Primary Active:** `#80ffff` (light teal)
- **Text Dark:** `#2B394B` (dark blue-gray)
- **Text Light:** `#666666`
- **Background:** `#FFFFFF`
- **Accent Background:** `#FFFFFB` (off-white)
- **Border:** `#EEEEEE`
- **Secondary:** `#F5F5F5` (light gray)

## Typography

**Font:** Poppins, sans-serif

**Headings:**

- H1: 40px, bold (700), uppercase
- H2: 32px, bold (700), uppercase
- H3: 28px, bold (700), uppercase (cards use 24px inline)
- H4: 24px, bold (700), uppercase
- H5: 20px, bold (700), uppercase
- H6: 16px, bold (700), uppercase

**Body:** 17px, normal (400)

## Layout Structure

### Grid System

- Uses Bootstrap-style `.row-fluid-wrapper` and `.row-fluid`
- Column spans: `.span4` (3 columns), `.span12` (full width)
- Widget spans: `.widget-span` with data attributes

### Section Classes

- `.dnd-section` - Drag and drop section wrapper
- `.dnd-row` - Row within section
- `.dnd-column` - Column within row
- `.dnd-module` - Individual module/widget

### Padding Classes

- `dnd_area-row-0-padding`
- `dnd_area-row-1-padding`
- etc.

## Key Modules Used

1. **Website Header** (`module_website-header`)
2. **Offer Card** (`module_offer-card`) - Service cards
3. **Logo Grid** (`module_logo_grid`) - Client logos
4. **Image Grid** (`module_image_grid`) - Gallery
5. **Blog Posts** (built-in)
6. **Contact Form** (HubSpot forms)

## Recommendations for Templates

### Use These Class Names

```css
.offer-card
.offer-card__image-wrapper
.offer-card__image
.offer-card__content
.offer-card__button-wrapper
.card
.card--light
.button
```

### Match These Specs

- Square buttons (no border-radius)
- Teal color scheme (#30beb4)
- Poppins font throughout
- All headings uppercase
- Inline font-size overrides on content
- Loading="lazy" on images
