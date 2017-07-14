import { CHANNEL } from 'erector/constants';

export default function isChannel(channelLike) {
  return channelLike[CHANNEL] === true;
}
