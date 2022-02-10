# Pug Resume Template
> Resume template with pug

## Example
![Resume example](resume-ugo-quelhas.en_en.png)

## Usage
Install all dependencies and run gulp:
```bash
npm run setup
```

Build pug file and create html file:
```bash
npm run build
```

Development
```bash
npm run dev
```

## Customization

### Content size
If the size of the CV exceeds one page, change this part in the `resume.less` file.
```less
@media print {
    @page {
        size: A4;   
        margin: 0;
    }
    body{
        margin: 1em 1.5em; //<--- if the marge are too large / small
        zoom: .87; //<--- increase or decrease this value
    }
}
```

### Content
Modify `locales/*` files to change the resume content.

### Stylesheet
Change the color, font-size etc. with the CSS var. in `src/style/resume.less` file:
- `primary`: primary color
- `color`: text color
- `name` : name
- `h1`
- `h2`
- `h3`
- `main-font-size`: size of all text

## HTML to PDF
```bash
$ chrome --headless --disable-gpu --print-to-pdf=path/to/dest --no-margins path/to/html/file
```