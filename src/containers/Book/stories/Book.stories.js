import { getDefaultMetadata, showTemplateStory } from '../../../../.storybook/helper'
import { PROP_DEFAULT_CCYS } from '../../../common/props'
import Component from '../Book.container'

export default getDefaultMetadata(Component, 'Containers/Book')

export const basic = showTemplateStory(Component)
basic.args = PROP_DEFAULT_CCYS.defaults
