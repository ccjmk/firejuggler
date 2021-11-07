import InstanceButton from '../components/instance-button'
import ServerStatus from '../components/server-status'
import Card from '../components/card'
import Instance from '../domain/Instance';
import InstanceStatus from '../domain/InstanceStatus';

import { getConfig, getFoundryPid } from '../common/instanceHandling';
import Config from '../domain/Config';
import { ReactElement } from 'react';
import cookies from 'next-cookies';

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
    <main className="align-middle">
      <ServerStatus currentInstance={running} />

      <Card>
        {instanceList}
      </Card>
    </main>
  )
}

async function handleInstanceToggle(instanceId: string) {
  const res = await fetch(`/api/toggle-instance/${instanceId}`)
  document.location.reload()
}

export async function getServerSideProps(ctx: any): Promise<{ props: { instances: Instance[] } } | { redirect: any }> {
  const fs = require('fs');
  let config: Config = getConfig();

  const cookie = cookies(ctx).adminKey;
  if (!cookie) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }


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
