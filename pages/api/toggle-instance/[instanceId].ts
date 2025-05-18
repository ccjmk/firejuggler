import { NextApiRequest, NextApiResponse } from "next";
import { getConfig, getFoundryPid } from "../../../common/instanceHandling";
import { InstanceConfig } from "../../../domain/InstanceConfig";

const { execSync, spawn } = require("child_process");

function stopInstance(instancePid: number) {
  execSync(`kill ${instancePid}`);
}

function startInstance(instance: InstanceConfig): number {
  console.info(`Starting instance ${instance.name} (id: ${instance.id})`);
  try {
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
  } catch (error) {
    throw new Error(
      `Error starting instance ${instance.name} (id: ${instance.id}): ` + error
    );
  }
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

  const instanceToToggle = instances.find((i) => i.id == instanceId);
  if (!instanceToToggle) {
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

  if (instanceToToggle !== runningInstance?.instance) {
    const pid = startInstance(instanceToToggle);
    console.info(
      `Started instance [${instanceToToggle.name}] with pid [${pid}] and id [${instanceId}]`
    );
  }

  return res.status(200).json({ queryId: instanceId });
}
