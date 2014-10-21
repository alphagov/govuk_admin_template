UNGUARDED_URL_USAGE = /\surl\(/

namespace :sass do
  desc 'Check all SCSS for unguarded url() usages'
  task :check do
    scss_files = File.expand_path(
        '../../../../app/assets/stylesheets/**/*.scss', __FILE__)

    matching_lines = Dir[scss_files].inject([]) do |matching, scss_file|
      File.readlines(scss_file).each_with_index do |line, number|
        matching << "#{scss_file}:#{number + 1}" if line =~ UNGUARDED_URL_USAGE
      end
      matching
    end

    if matching_lines.any?
      raise <<-MSG

Do not use instances of url(...) to refer to images within this gem.
Prefer the SASS function image-url. Unguarded url references won't work in
Rails 4 and up due to MD5 hashes in asset filenames. Your asset will 404 in
production Rails 4 apps.

Lines that use url(...) to refer to images within this gem:

      #{matching_lines.join("\n  ")}

      MSG
    end

  end
end
