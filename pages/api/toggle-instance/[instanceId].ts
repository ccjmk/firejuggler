import { NextApiRequest, NextApiResponse } from "next";
import { getConfig, getFoundryPid } from "../../../common/instanceHandling";
import { InstanceConfig } from "../../../domain/InstanceConfig";

const { execSync, spawn } = require("child_process");

function stopInstance(instancePid: number) {
  execSync(`kill ${instancePid}`);
}

function startInstance(instance: InstanceConfig): number {
  console.info(`Starting instance ${instance.name} (id: ${instance.id})`);
  const fvtt = spawn(
    "node",
    [
      `${instance.foundry.app}/resources/app/main.js`,
      `--dataPath=${instance.foundry.data}`,
    ],
    {
      detached: true,
    }
  );
  return fvtt.id;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { instanceId } = req.query;
  console.info(`instanceId: [${instanceId}]`);
  const instances: InstanceConfig[] = getConfig().instances;
  let runningInstance: { instance: InstanceConfig; pid: number } | undefined;

  for (const instance of instances) {
    const pid = getFoundryPid(instance.foundry.app);
    if (pid) {
      runningInstance = { instance, pid };
      break;
    }
  }

  const toToggle = instances.find((i) => i.id == instanceId);
  if (!toToggle) {
    const message = `Unable to find instance with id [${instanceId}] for operation`;
    console.error(message);
    return res.status(403).json({ message: message });
  }

  if (runningInstance) {
    console.info(
      `Found running instance.. stopping [${runningInstance.instance.name}]`
    );
    stopInstance(runningInstance.pid);
  }

  if (toToggle !== runningInstance?.instance) {
    startInstance(toToggle);
  }

  return res.status(200).json({ queryId: instanceId });
}
