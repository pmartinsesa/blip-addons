import { BaseFeature } from './BaseFeature'

export class BuilderTitle extends BaseFeature {
  public static alwaysClean = true

  /**
   * Returnns the name of the bot
   */
  public get botName() {
    const botNameElement = document.querySelector('.bot-name:nth-child(1)')

    return botNameElement ? botNameElement.innerHTML : 'Unknown'
  }

  /**
   * Returns if the current page is Beholder
   */
  public get isBeholder() {
    const iFrames = Array.from(document.querySelectorAll('iframe'))

    return iFrames.find((iFrame) => {
      const source = iFrame.getAttribute('src')

      return source.includes('beholder')
    })
  }

  /**
   * Adds title to builder
   */
  public handle() {
    const botName = this.botName

    document.title = `${botName} - Blip`
  }

  /**
   * Adds title to other Blip pages
   */
  public cleanup() {
    if (this.isBeholder) {
      document.title = 'Beholder - Blip'
    } else {
      document.title = 'Blip Portal'
    }
  }
}
