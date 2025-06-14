# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2025-06-14

### Breaking

- Renames `toParts` to `msToParts`
- Renames `MICROSECONDS_IN_A_MILLISECOND` to `MICROSECONDS_IN_MILLISECOND`
- Renames `MILLISECONDS_IN_A_SECOND` to `MILLISECONDS_IN_SECOND`
- Renames `NANOSECONDS_IN_A_MICROSECOND` to `NANOSECONDS_IN_MICROSECOND`

### Added

- `msToClock` function to convert milliseconds to a clock string
- `clockToMs` function to convert a clock string to milliseconds
- `partsToMs` function to convert an object with time unit properties to milliseconds
- `Parts` interface to represent the parts of a duration
- `TimeUnit` type to represent the time unit strings used in the `parseDuration` function

### Fixed

- Incorrect/missing documentation
- Floating point conversion error

## [1.2.0] - 2025-06-10

### Added

- Code coverage check
- Microseconds and nanoseconds support

## [1.1.2] - 2025-05-06

### Changed

- Workflow adjustments

### Fixed

- Missing package files path

## [1.1.1] - 2025-05-05

### Added

- Contributing guide
- Security policy
- PR + issue templates

### Changed

- README adjustments

### Fixed

- `parseDuration` strict mode example ([#3], thanks [@spyros-uk])

## [1.1.0] - 2025-05-05

### Added

- `weeks` unit converter
- `WEEK` and `DAYS_IN_WEEK` constants
- `weeks` to `toParts` function output

### Changed

- Updated dev dependencies
- Output modules in distribution

### Fixes

- README typos
- Clean up
- Changelog URLs

## [1.0.0] - 2025-05-05

### Changed

- Update readme

## [0.0.2] - 2025-05-05

### Fixed

- Update incorrect documentation
- Update README

## [0.0.1] - 2025-05-04

### Added

- Initial setup
- Constants for time units
- Unit converter functions for `days`, `hours`, `minutes`, `seconds` and `milliseconds`
- `toParts` function to convert milliseconds to an object with properties for each time unit
- `parseDuration` function to parse a duration string into milliseconds

[#3]: https://github.com/simmo/niobe/pull/3
[@spyros-uk]: https://github.com/spyros-uk
[unreleased]: https://github.com/simmo/niobe/compare/2.0.0...HEAD
[1.0.0]: https://github.com/simmo/niobe/compare/0.0.2...1.0.0
[0.0.2]: https://github.com/simmo/niobe/compare/0.0.1...0.0.2
[0.0.1]: https://github.com/simmo/niobe/compare/f3751e...0.0.1
[1.1.0]: https://github.com/simmo/niobe/compare/1.0.1-beta.1...1.1.0
[1.1.1]: https://github.com/simmo/niobe/compare/1.1.1-beta.2...1.1.1
[1.1.2]: https://github.com/simmo/niobe/compare/1.1.2-beta.0...1.1.2
[1.2.0]: https://github.com/simmo/niobe/releases/tag/1.2.0

[2.0.0]: https://github.com/simmo/niobe/compare/2.0.0-beta.0...2.0.0
