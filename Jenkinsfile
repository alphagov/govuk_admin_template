#!/usr/bin/env groovy

library("govuk")

node {
  govuk.buildProject(
    sassLint: false,
    overrideTestTask: {
      sh "bundle exec rake"
    }
  )
}
