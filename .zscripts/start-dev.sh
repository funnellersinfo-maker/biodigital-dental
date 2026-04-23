#!/bin/bash
# Persistent dev server for BioDigital Dental
# Auto-restarts if crashed
cd /home/z/my-project

exec npx next dev -p 3000
