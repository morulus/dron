import { CHANNEL } from '../../constants';

export default function isChannel(channelLike) {
  return channelLike[CHANNEL] === true;
}
