#!/bin/bash -x
set -e

rm -f Gemfile.lock
git clean -fdx
bundle install --path "${HOME}/bundles/${JOB_NAME}"

for ruby_version in 2.1 2.2; do
  for gemfile in rails_3.2 rails_4.1 rails_4.2; do
    RBENV_VERSION=${ruby_version} bundle install \
      --path "${HOME}/bundles/${JOB_NAME}" \
      --gemfile "gemfiles/${gemfile}.gemfile"

    RBENV_VERSION=${ruby_version} \
      BUNDLE_PATH="${HOME}/bundles/${JOB_NAME}" \
      BUNDLE_GEMFILE="gemfiles/${gemfile}.gemfile" \
      bundle exec rake
  done
done

if [[ -n "$PUBLISH_GEM" ]]; then
  bundle exec rake publish_gem
fi
