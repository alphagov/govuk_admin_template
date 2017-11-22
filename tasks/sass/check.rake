UNGUARDED_URL_USAGE  = /\surl\(/
ABSOLUTE_ASSET_USAGE = /(?:image-path|image-url|asset-path|asset-url)\(["']\/assets/

namespace :sass do
  desc 'Check all SCSS for 404-creating problems, takes place of govuk-lint'
  task :check do
    scss_files = File.expand_path(
        '../../../app/assets/stylesheets/**/*.scss', __FILE__)

    matching_lines = Dir[scss_files].inject([]) do |matching, scss_file|
      File.readlines(scss_file).each_with_index do |line, number|
        matching << "Unguarded url usage: #{scss_file}:#{number + 1}"    if line =~ UNGUARDED_URL_USAGE
        matching << "Absolute /assets usage: #{scss_file}:#{number + 1}" if line =~ ABSOLUTE_ASSET_USAGE
      end
      matching
    end

    if matching_lines.any?
      raise <<-MSG

One or more problems exist:

Unguarded url usage
-------------------

  Do not use instances of url(...) to refer to images within this gem.
  Prefer the SASS function image-url. Unguarded url references won't work in
  Rails 4 and up due to MD5 hashes in asset filenames. Your asset will 404 in
  production Rails 4 apps.

Absolute /assets usage
----------------------

  When using any of the image/asset helpers, don't refer to /assets absolutely.
  For example,

    image-url('/assets/govuk_admin_template/header-crown.png')

  should instead be

    image-url('govuk_admin_template/header-crown.png')

  If Sprockets can't find the image on precompilation, it won't rewrite the
  URL and will pass it through unaltered. This usually means it will 404.

Problems:
      #{matching_lines.join("\n  ")}

      MSG
    end

  end
end
