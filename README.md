# FireJuggler for Foundry VTT

FireJuggler is a small web application you can deploy on your Foundry VTT linux server to manage multiple installed fvtt instances: see what installation you are currently running, stop/start and swich between them.

This is a [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/) as both a problem-solver for me wanting to be able to manage foundry vtt instances on my EC2 server without actually ssh'ing into to, and as a little test run for the technologies involved.

* [Setting up FireJuggler](#setting-up-firejuggler)
* [Configuring your instances](#configuring-your-instances)
* [Running FireJuggler](#running-firejuggler)
* [Errors?](#errors)
* [Windows Support](#does-this-work-on-windows)
* [Changelog](#changelog)

## Setting up FireJuggler

You need to download this project into the server and build + run it with Node.js. As foundry requires node itself, that shouldn't be usually a problem.

After downloading it, you can build the project with `npm run build`. That would leave it almost ready to run, needing only some json configuration to find the installed FoundryVTT instances. 

## Configuring your instances

The project has a file named config-EXAMPLE.json on the root. Copy or rename that file into a file called `config.json` and edit it with whatever text editing tool you prefer. You will need to define an ID and a human-readable name for each instance, and the root path of both foundry's /foundryvtt directory and the data directory.

Just in case, here's an example content you can also copy and edit:

    {
        "instances": [
            {
                "id": 1,
                "name": "Readable name of instance 1",
                "foundry": {
                    "app": "/path/to/instance1/foundryvtt",
                    "data": "/path/to/instance1/foundrydata"
                }
            },
            {
                "id": 2,
                "name": "Readable name of instance 1",
                "foundry": {
                    "app": "/path/to/instance2/foundryvtt",
                    "data": "/path/to/instance2/foundrydata"
                }
            }
        ]
    }


## Running FireJuggler

With the project already built and instances configured, run it with `npm run start` (you might want to run that with an '&' at the end to run on background and disown the process from the terminal so you can safely close it without the FireJuggler process dying). **Remember to first setup your instances.**

By default, the application runs on port 3000. You might want to reverse-proxy into that port using Nginx or Caddy to hide it under a different name. I like having my foundry running on foundry.mydomain.xyz, and this tool on firejuggler.mydomain.xyz, for example.

Open your.server.ip/your.domain.name:3000 with your browser to see the interface.

## Errors ?!

If you encounter any issue, the application tries to log little but meaningful messages as it executes, so be sure to check your server's standard output if you see anything fishy.

I also recommend using absolute paths for the config.json. I would expect relative paths to also work, but absolute paths are clearer imo when you are refering to external paths from a project.

## Does this work on Windows?

No, sorry. If anyone with more windows CLI experience wants to submit a MR to make it work, I'll be glad to check it. I actually tried to make it windows-compatible out of the box but I could't find an eas way of getting the process id of a particular node execusion like I did on linux with the instance's config 'foundry.app' key and pgrep.

## Changelog

- v1.0.0 - First public release.
- v2.0.0 - [WIP] Added authentication/authorization via  