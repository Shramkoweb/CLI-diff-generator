<a href="https://codeclimate.com/github/Shramkoweb/frontend-project-lvl2/maintainability"><img src="https://api.codeclimate.com/v1/badges/8b6a6d577e7c7699a52f/maintainability" /></a> 
<a href="https://codeclimate.com/github/Shramkoweb/frontend-project-lvl2/test_coverage"><img src="https://api.codeclimate.com/v1/badges/8b6a6d577e7c7699a52f/test_coverage" /></a>
[![Lint](https://github.com/Shramkoweb/frontend-project-lvl2/workflows/Lint/badge.svg)](https://github.com/Shramkoweb/frontend-project-lvl2/actions?query=workflow%3ALint)

## Описание
В рамках данного проекта необходимо реализовать утилиту для поиска отличий в конфигурационных файлах.

## Для работы необходимо
 - node 14+
 - CLI  😄

### Возможности утилиты:

- Поддержка разных форматов
- Генерация отчета в виде plain text, pretty и json


#### Пример использования:

```shell script
$ gendiff --format plain first-config.ini second-config.ini
Setting "common.setting2" deleted.
Setting "common.setting4" added with value "blah blah".
Setting "group1.baz" changed from "bas" to "bars".
Section "group2" deleted.
```

#### Сравнение файлов с JSON выводом.

[![asciicast](https://asciinema.org/a/Mf12iQsBgMs3KtShNDxeY2t4S.svg)](https://asciinema.org/a/Mf12iQsBgMs3KtShNDxeY2t4S)

#### Сравнение файлов с STYLISH выводом.

[![asciicast](https://asciinema.org/a/l0lTgJzWPUOsGidSmaptSsiHj.svg)](https://asciinema.org/a/l0lTgJzWPUOsGidSmaptSsiHj)

#### Сравнение файлов с PLAIN выводом.

[![asciicast](https://asciinema.org/a/7q3RtpIpRTu6uEtIIrGgT32fb.svg)](https://asciinema.org/a/7q3RtpIpRTu6uEtIIrGgT32fb)
