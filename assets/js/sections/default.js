import framework from 'framework'
import config from 'config'
import utils from 'utils'
import $ from 'dom-select'
import event from 'dom-event'
import classes from 'dom-classes'
import query from 'query-dom-components'

class Default {

    constructor(opt = {}) {

        this.view = config.view
        this.page = null
        this.a = null
    }

    init(req, done, options) {

        const opts = options || { cache: true, sub: false }

        const view = this.view
        const ready = this.dataAdded.bind(this, done)
        const page = this.page = utils.biggie.loadPage(req, view, opts, ready)
    }

    dataAdded() {

        this.ui = query({ el: this.page })

        this.a = $.all('a', this.page)

        utils.biggie.addRoutingEL(this.a)
        // remove for production, use for debugging
        console.log(window._data)
    }

    resize(width, height) {

        config.height = height
        config.width = width
    }

    destroy() {

        utils.biggie.removeRoutingEL(this.a)

        this.a = null
    }
}

module.exports = Default
