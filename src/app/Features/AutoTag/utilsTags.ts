import { v4 as uuid } from 'uuid';
import { Settings } from '~/Settings';
import { getBlockById, getUniqActions } from '~/Utils';

export const updateTags = (blockId: string): void => {
  if(!blockId) return;
  const block = getBlockById(blockId);

  block.$tags = [];
  const actions = getUniqActions(block);

  actions.forEach((action) => {
    const newTag = setNewTag(action);
    block.$tags.push(newTag);
  });
};

const setNewTag = (action): any => {
  const tagId = `blip-tag-${uuid()}`;
  const tagColor = getTagColor(action);

  return {
    id: tagId,
    label: action,
    background: tagColor,
    canChangeBackground: false,
  };
};

const getTagColor = (action): any => {
  const matchedAction = Settings.defaultTags.filter(
    (tag) => tag.name === action
  )[0];

  return matchedAction.color;
};
