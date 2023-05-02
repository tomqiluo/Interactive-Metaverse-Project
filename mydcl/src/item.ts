export type Props = {
    onClick?: Actions
    onOpen?: Actions
    onClose?: Actions
    onClickText?: string
}

export default class TestItem implements IScript<Props> {
    active: Record<string, boolean> = {}

    init() { }

    toggle(entity: Entity, value: boolean) {
        if (this.active[entity.name!] === value) return

        const collider = Object.keys(entity.children).map(
            key => entity.children[key]
        )[0]
        if (collider) {
            collider.addComponentOrReplace(
                new Transform({
                    scale: value ? new Vector3(0.5, 0.5, 0.5) : new Vector3(1, 1, 1)
                })
            )
        }
        this.active[entity.name!] = value
    }

    spawn(host: Entity, props: Props, channel: IChannel) {
        const entity = new Entity(host.name + '-entity')
        entity.setParent(host)
        entity.addComponent(new Transform())
        entity.addComponent(new BoxShape())

        const collider = new Entity(entity.name! + '-collider')
        collider.setParent(entity)
        collider.addComponent(new Transform())
        collider.addComponent(new BoxShape())

        this.active[entity.name!] = false

        // handle actions
        channel.handleAction('open', ({ sender }) => {
            if (!this.active[entity.name!]) {
                this.toggle(entity, true)
            }
            if (sender === channel.id) {
                channel.sendActions(props.onOpen)
            }
        })
        channel.handleAction('close', ({ sender }) => {
            if (this.active[entity.name!]) {
                this.toggle(entity, false)
            }
            if (sender === channel.id) {
                channel.sendActions(props.onClose)
            }
        })
        channel.handleAction('toggle', ({ sender }) => {
            const newValue = !this.active[entity.name!]
            this.toggle(entity, newValue)
            if (sender === channel.id) {
                channel.sendActions(newValue ? props.onOpen : props.onClose)
            }
        })

        // sync initial values
        channel.request<boolean>('isOpen', isOpen =>
            this.toggle(entity, isOpen)
        )
        channel.reply<boolean>('isOpen', () => this.active[entity.name!])
    }
} 