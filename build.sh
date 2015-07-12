#!/bin/bash

APPNAME=RegexKit

zip -r ../${PWD##*/}.nw *

mv -f ../${APPNAME}.nw ../app.nw
mv -f ../app.nw ../${APPNAME}.app/Contents/Resources/app.nw
open ../${APPNAME}.app
