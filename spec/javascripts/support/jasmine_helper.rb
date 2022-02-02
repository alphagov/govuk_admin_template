require "jasmine_selenium_runner/configure_jasmine"
require "govuk_test"

class ChromeHeadlessJasmineConfigurer < JasmineSeleniumRunner::ConfigureJasmine
  def selenium_options
    { options: GovukTest.headless_chrome_selenium_options }
  end
end
