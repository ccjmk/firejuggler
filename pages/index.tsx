import Head from 'next/head'
import InstanceButton from '../components/instance-button'
import ServerStatus from '../components/server-status'
import Instance from '../domain/Instance';
import InstanceStatus from '../domain/InstanceStatus';

import { getConfig, getFoundryPid } from '../common/instanceHandling';
import Config from '../domain/Config';
import { ReactElement } from 'react';

export default function Home({ instances }: { instances: Instance[] }): JSX.Element {
  const instanceList: ReactElement[] = [];
  const running = instances.find(i => i.status == InstanceStatus.RUNNING);

  instances.forEach((instance: Instance, index: number) => {
    instanceList.push(
      <InstanceButton
        key={index}
        instance={instance}
        handleOnToggle={handleInstanceToggle}
      />
    )
  })

  return (
    <div className="flex flex-col bg-indigo-900 p-4 text-white h-screen justify-between">
      <Head>
        <title>FireJuggler</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>

      <h1 className="p-4 m-4 text-4xl font-bold">
        FireJuggler for Foundry VTT
      </h1>

      <main className="align-middle">
        <div>
          <ServerStatus currentInstance={running} />
        </div>

        <div className="bg-gray-50 border-b p-auto m-auto rounded-lg w-2/5 ">
          {instanceList}
        </div>
      </main>

      <footer className="text-center font-semibold align-bottom">
        Made with <a href="https://nextjs.org/">NextJS</a>, <a href="https://tailwindcss.com/">Tailwind</a> & Love - by ccjmk
      </footer>
    </div>
  )
}

async function handleInstanceToggle(instanceId: string) {
  const res = await fetch(`/api/toggle-instance/${instanceId}`)
  document.location.reload()
}

export async function getServerSideProps(): Promise<{ props: { instances: Instance[] } }> {
  const fs = require('fs');
  let config: Config = getConfig();

  const instances: Instance[] = config.instances.map(i => {
    let version;
    let instancePid;
    try {
      let instancePackageJson = JSON.parse(fs.readFileSync(`${i.foundry.app}/resources/app/package.json`));
      version = instancePackageJson.version;
      instancePid = getFoundryPid(i.foundry.app);
    } catch (error) {
      return { id: i.id, name: i.name, version: "UNKNOWN", status: InstanceStatus.NOT_FOUND }
    }
    return { id: i.id, name: i.name, version: version, status: instancePid ? InstanceStatus.RUNNING : InstanceStatus.STOPPED }
  });

  return { props: { instances: instances } }
}
