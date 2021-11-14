import { Injectable } from '@angular/core'

@Injectable()
export class ProjectsService {
  mainImages = [
    { f: 'agency', t: 'home', ext: 'png', title: 'Numbers Agency', desc: 'Apply as an agency to become partner with us' },
    { f: 'agente', t: 'home', ext: 'png', title: 'Numbers Agente', desc: 'Apply as an agent to become partner with us' },
    { f: 'tip', t: 'login', title: 'Tipresento', desc: 'Invite friends, win leads, translate them to Amazon coupons' },
    { f: 'swp', t: 'login', title: 'Swap', desc: 'Banking system for a client' },
  ]

  allProjects: any = {
    agency: {
      f: 'agency',
      t: 'home',
      ext: 'png',
      title: 'Numbers Agency',
      desc: 'Apply as an agency to become partner with us',
      imgs: ['home', 'errors'],
    },
    agente: {
      f: 'agente',
      t: 'home',
      ext: 'png',
      title: 'Numbers Agente',
      desc: 'Apply as an agent to become partner with us',
      imgs: ['home', 'errors'],
    },
    tip: {
      f: 'tip',
      t: 'login',
      title: 'Tipresento',
      desc: 'Invite friends, win leads, translate them to Amazon coupons',
      imgs: [
        'agent-dashboard',
        'agent-invite-friend',
        'agent-leads',
        'agent-notifications',
        'agent-riscuoti',
        'agent-send-category',
        'agent-signup',
        'agent-single-lead',
        'agent-wallet',
        'login',
        'logout',
        'profile',
        'singupask',
        'supplier-billing',
        'supplier-change-profile-pic',
        'supplier-edit-profile',
        'supplier-lead',
        'supplier-notifications',
        'supplier-single-lead',
      ],
      imgs_m: [
        'billing-supplier',
        'edit-profile',
        'home-supplier',
        'home',
        'invite',
        'lead-details-supplier',
        'lead-details',
        'leads',
        'logout',
        'new-cat-inv',
        'notifications',
        'profile',
        'res-table-3',
        'res-table-2',
        'responsive-table',
        'riscuoti',
        'sign-agent',
        'signup1',
        'supplier-profile',
        'table-filters',
        'wallet',
      ],
      imgs_d_d: ['img1', 'img2', 'img3', 'img4', 'img5', 'img6', 'img7', 'img8', 'img9'],
    },
    swp: {
      f: 'swp',
      t: 'login',
      title: 'Swap',
      desc: 'Banking system for a client',
      imgs: [
        'act_as',
        'btc_dashboard',
        'btc',
        'clients',
        'forgot',
        'login',
        'new_store',
        'new_user',
        'settings',
        'single_client',
        'single_store',
        'single_transaction',
        'stores',
        'transactions',
        'update_user',
      ],
      imgs_m: [
        'clients',
        'deposit',
        'edit-profile',
        'home',
        'login',
        'new-client',
        'new-store',
        'new-user',
        'responsive-table',
        'settings',
        'sidebar',
        'single-store',
        'transfer-menu',
      ],
    },
  }

  projectsMainList = this.mainImages.map((img) => {
    return {
      path: `assets/media/${img.f}/${img.t}.${img.ext ? img.ext : 'PNG'}`,
      ...img,
    }
  })

  constructor() {}
}
