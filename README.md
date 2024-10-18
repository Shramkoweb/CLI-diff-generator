<a href="https://codeclimate.com/github/Shramkoweb/frontend-project-lvl2/maintainability"><img src="https://api.codeclimate.com/v1/badges/8b6a6d577e7c7699a52f/maintainability" /></a> 
<a href="https://codeclimate.com/github/Shramkoweb/frontend-project-lvl2/test_coverage"><img src="https://api.codeclimate.com/v1/badges/8b6a6d577e7c7699a52f/test_coverage" /></a>
[![Lint](https://github.com/Shramkoweb/frontend-project-lvl2/workflows/Lint/badge.svg)](https://github.com/Shramkoweb/frontend-project-lvl2/actions?query=workflow%3ALint)

## Description
This project implements a utility for finding differences in configuration files.

##Requirements

- Node.js 14+
- CLI 😄

## Utility Features:

- Support for various file formats (JSON, YAML, INI)
- Generates reports in **plain text**, **pretty**, and **JSON** formats


## Example Usage:

```shell script
$ gendiff --format plain first-config.ini second-config.ini
Setting "common.setting2" deleted.
Setting "common.setting4" added with value "blah blah".
Setting "group1.baz" changed from "bas" to "bars".
Section "group2" deleted.
```

### File Comparison with JSON Output:

[![asciicast](https://asciinema.org/a/Mf12iQsBgMs3KtShNDxeY2t4S.svg)](https://asciinema.org/a/Mf12iQsBgMs3KtShNDxeY2t4S)

### File Comparison with STYLISH Output:

[![asciicast](https://asciinema.org/a/l0lTgJzWPUOsGidSmaptSsiHj.svg)](https://asciinema.org/a/l0lTgJzWPUOsGidSmaptSsiHj)

### File Comparison with PLAIN Output:

[![asciicast](https://asciinema.org/a/7q3RtpIpRTu6uEtIIrGgT32fb.svg)](https://asciinema.org/a/7q3RtpIpRTu6uEtIIrGgT32fb)

Created by [Serhii Shramko](https://shramko.dev/).
