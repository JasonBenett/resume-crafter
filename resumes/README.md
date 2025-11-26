# Resumes Directory

This directory is for your personal resume configurations.

## Quick Start

Create a new resume configuration:

```bash
node src/cli.js init
```

This will create `resumes/resume.yaml` which you can edit with your information.

## Multiple Resumes

You can maintain multiple resume configurations in this directory:

```bash
node src/cli.js init -o resumes/resume-tech.yaml
node src/cli.js init -o resumes/resume-creative.yaml
```

Then build specific versions:

```bash
node src/cli.js build -c resumes/resume-tech.yaml -o dist-tech
node src/cli.js build -c resumes/resume-creative.yaml -o dist-creative
```

## Note

Files in this directory (except this README) are ignored by git, so your personal information stays private.
