module GovukAdminTemplate
  def self.setup_simple_form(config)
    # Wrappers are used by the form builder to generate a complete input.
    # You can remove any component from the wrapper, change the order or
    # even add your own to the stack.

    # The options given below are used to wrap the whole input.
    config.wrappers :default, class: :input, hint_class: :field_with_hint, error_class: :field_with_errors do |b|
      # Determines whether to use HTML5 (:email, :url, ...)
      # and required attributes
      b.use :html5

      # Calculates placeholders automatically from I18n
      # You can also pass a string as f.input placeholder: "Placeholder"
      b.use :placeholder

      ## Optional extensions
      # They are disabled unless you pass `f.input EXTENSION_NAME => :lookup`
      # to the input. If so, they will retrieve the values from the model
      # if any exists. If you want to enable the lookup for any of those
      # extensions by default, you can change `b.optional` to `b.use`.

      # Calculates maxlength from length validations for string inputs
      b.optional :maxlength

      # Calculates pattern from format validations for string inputs
      b.optional :pattern

      # Calculates min and max from length validations for numeric inputs
      b.optional :min_max

      # Calculates readonly automatically from readonly attributes
      b.optional :readonly

      ## Inputs
      b.use :label_input
      b.use :hint,  wrap_with: { tag: :span, class: :hint }
      b.use :error, wrap_with: { tag: :span, class: :error }
    end

    config.wrappers :bootstrap, tag: "div", class: "form-group", error_class: "has-error" do |b|
      b.use :html5
      b.use :placeholder
      b.use :label, class: "control-label"
      b.wrapper tag: "div" do |ba|
        ba.use :input
        ba.use :error, wrap_with: { tag: "span", class: "help-inline" }
        ba.use :hint,  wrap_with: { tag: "p", class: "help-block" }
      end
    end

    config.wrappers :prepend, tag: "div", class: "form-group", error_class: "has-error" do |b|
      b.use :html5
      b.use :placeholder
      b.use :label
      b.wrapper tag: "div", class: "controls" do |input|
        input.wrapper tag: "div", class: "input-prepend" do |prepend|
          prepend.use :input
        end
        input.use :hint,  wrap_with: { tag: "span", class: "help-block" }
        input.use :error, wrap_with: { tag: "span", class: "help-inline" }
      end
    end

    config.wrappers :append, tag: "div", class: "form-group", error_class: "has-error" do |b|
      b.use :html5
      b.use :placeholder
      b.use :label
      b.wrapper tag: "div", class: "controls" do |input|
        input.wrapper tag: "div", class: "input-append" do |append|
          append.use :input
        end
        input.use :hint,  wrap_with: { tag: "span", class: "help-block" }
        input.use :error, wrap_with: { tag: "span", class: "help-inline" }
      end
    end

    # The default wrapper to be used by the FormBuilder.
    config.default_wrapper = :bootstrap

    # Define the way to render check boxes / radio buttons with labels.
    # Defaults to :nested for bootstrap config.
    #   inline: input + label
    #   nested: label > input
    config.boolean_style = :inline

    # Default class for buttons
    config.button_class = "btn"

    # Default tag used for error notification helper.
    config.error_notification_tag = :div

    # CSS class to add for error notification helper.
    config.error_notification_class = "alert alert-danger"

    # Tell browsers whether to use default HTML5 validations (novalidate option).
    # Default is enabled.
    config.browser_validations = false
  end
end
