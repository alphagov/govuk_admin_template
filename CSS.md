# Admin CSS

CSS in the gem follows two conventions:
* Naming patterns and class usage inline with Bootstrap 3
  * eg the `text-muted` class and the gem specific `link-muted` class
  * Using multiple classes in combination, eg `table table-bordered table-hover`
* [Principles of writing consistent, idiomatic CSS](https://github.com/necolas/idiomatic-css)

## Available helper classes

Firstly, the admin styles are based on Bootstrap:
* [Bootstrap CSS](http://getbootstrap.com/css/)
* [Bootstrap Components](http://getbootstrap.com/components/)

For admin components, see the admin style guide (`/style-guide` in your app).

### Hide and show content
[toggle.css.scss](app/assets/stylesheets/govuk_admin_template/toggles.css.scss)

Class   | Purpose
------  |--------
`hide` | Hide content from all users, including screenreaders
`if-no-js-hide` | Hide from users without Javascript
`if-js-hide` | Hide from users with Javascript
`rm` | [Hide visually](http://snook.ca/archives/html_and_css/hiding-content-for-accessibility) but keep available to screenreaders
`if-js-rm` | Hide visually from users with Javascript

### Margin helpers

Rather than creating a class purely to remove or add margins (many Bootstrap styled elements come with margins), use these helpers which come bundled with the default margins necessary to keep a consistent vertical rhythm. This also avoids a specificity nightmare. (These classes use `!important` so that they’ll _almost_ always work).

```html
<h3 class="add-top-margin"></h3>
```

The mixins don’t include `!important` by default, but can be added as a parameter:

```sass
.class {
  @include add-top-margin;
  @include add-top-margin('!important');
}
```

Class   | Mixin | Purpose
------  | ----- | --------
`add-top-margin` | `@include add-top-margin;` | Add _default vertical margin_ to top of element
`add-bottom-margin` | `@include add-bottom-margin;` |  Add _default vertical margin_ to bottom of element
`add-label-margin` | `@include add-label-margin;` | Simulates the vertical spacing between a Bootstrap label and an input element (5px)
`add-vertical-margins` | `@include add-vertical-margins;` | Add _default vertical margin_ to top and bottom
`remove-top-margin` || Remove all margins from top of element
`remove-bottom-margin` || Remove all margins from bottom of element
`add-right-margin` | `@include add-right-margin;` | Add margin to the right of element
`add-left-margin` | `@include add-left-margin;` | Add margin to the left of element

### Padding helpers

Like the margin helpers, the padding classes include `!important` so they’ll always work. The mixins default to not using `!important`, but this can be added with a parameter.

```html
<h3 class="add-bottom-padding"></h3>
```

```sass
.class {
  @include add-top-padding;
  @include add-top-padding('!important');
}
```

Class   | Mixin | Purpose
------  |------ | -------
`add-top-padding` |`@include add-top-padding;`| Add _default vertical padding_ to top of element
`add-bottom-padding` |`@include add-bottom-padding;`| Add _default vertical padding_ to bottom of element
`add-vertical-padding` |`@include add-vertical-padding;`| Add _default vertical padding_ to top and bottom
`remove-padding` || Remove all padding from element
`remove-top-padding` || Remove top padding
`remove-bottom-padding` || Remove bottom padding

### Input helpers

Class   | Purpose
------  |--------
`input-md-x` | Restrict the width of an input to a column size

### Icon helpers

Class   | Purpose
------  |--------
`glyphicon-smaller-than-text` | Bootstrap 3 glyphicons look unnaturally large against the same sized text. This class knocks them down to a friendlier size.

### Link helpers

Class   | Purpose
------  |--------
`no-visit` | Prevent a link from showing a visited state (eg when used as a Javascript hook)
`link-muted` | Like Bootstrap’s `text-muted`, but for links. Makes them a matching grey and underlined.
`link-inherit` | Inherits its colour from surrounding text, gains an underline

### Tables
[tables.css.scss](app/assets/stylesheets/govuk_admin_template/tables.css.scss)

Class   | Purpose
------  |--------
`table-header` | Add to rows in `<thead>` to give table headings greater contrast
`table-header-secondary` | Again in `<thead>`, for less important header rows. Uses a lighter grey.

### SASS Variables

Along with Bootstrap’s many [mixins](https://github.com/twbs/bootstrap-sass/blob/master/vendor/assets/stylesheets/bootstrap/_mixins.scss) and [variables](http://getbootstrap.com/customize/#less-variables), the admin gem comes with [some of its own](app/assets/stylesheets/govuk_admin_template/theme.css.scss).

Class   | Purpose
------  |--------
`$font-family-gill-sans` | Gill Sans font stack
`$default-vertical-margin` | Based on Bootstrap’s `$line-height-computed`. Use increments of this value.
`$link-color-visited` | Like Bootstrap’s `$link-color`, the purple visited link colour.
