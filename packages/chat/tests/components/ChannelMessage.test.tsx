import * as React from 'react'
import * as renderer from 'react-test-renderer'
import Message from '../../src/ui/components/Channel/Message'

test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <Message
      id="abc"
      teamId="abc"
      channelId="yolo"
      userId="1"
      user={{ id: 1, username: 'mikey', name: 'Mike', iconUrl: '' }}
      createdAt="01-01-2001"
      body="Hello world!"
    />,
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
