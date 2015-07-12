#!/bin/bash

APPNAME=regex

zip -r ../${PWD##*/}.nw *

mv -f ../${APPNAME}.nw ../app.nw
mv -f ../app.nw ../nwjs.app/Contents/Resources/app.nw
open ../nwjs.app
