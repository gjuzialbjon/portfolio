import { Injectable } from '@angular/core';

@Injectable()
export class ProjectsService {
  images = [
    { f: 'agency', t: 'home', ext: 'png', title: 'Numbers Agency', desc: 'Apply as an agency to become partner with us' },
    { f: 'agente', t: 'home', ext: 'png', title: 'Numbers Agente', desc: 'Apply as an agent to become partner with us' },
    { f: 'tip', t: 'login', title: 'Tipresento', desc: 'Invite friends, win leads, translate them to Amazon coupons' },
    { f: 'swp', t: 'login', title: 'Swap', desc: 'Banking system for a client' },
  ]

  projects: any = {
    agency: { f: 'agency', t: 'home', ext: 'png', title: 'Numbers Agency', desc: 'Apply as an agency to become partner with us' },
    agente: { f: 'agente', t: 'home', ext: 'png', title: 'Numbers Agente', desc: 'Apply as an agent to become partner with us' },
    tip: { f: 'tip', t: 'login', title: 'Tipresento', desc: 'Invite friends, win leads, translate them to Amazon coupons' },
    swp: { f: 'swp', t: 'login', title: 'Swap', desc: 'Banking system for a client' },
  }

  projectsMainList = this.images.map((img) => {
    return {
      path: `assets/media/${img.f}/${img.t}.${img.ext ? img.ext : 'PNG'}`,
      ...img,
    }
  })

  constructor() {}
}
