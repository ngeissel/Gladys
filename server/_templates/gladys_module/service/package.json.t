---
to: ./services/<%= module %>/package.json
---
{
  "author": {
      "name": "Nicolas Geissel <protz@beroot.fr> (https://github.com/ngeissel/)"
  },
  "name": "gladys-<%= module %>",
  "version": "1.0.0",
  "main": "index.js",
  "os": [
    "darwin",
    "linux",
    "freebsd",
    "win32"
  ],
  "cpu": [
    "x64",
    "arm",
    "arm64"
  ],
  "scripts": {},
  "dependencies": {
  }
}
