import * as wang_vote_service from "./wang-vote.service"
import * as user_service from "../user/user.service"

describe("handleCron", () => {
    let inst: any
    let inst2: any

    beforeEach(() => {
        inst = new user_service.UserService(undefined, undefined)
        inst2 = new wang_vote_service.WangVoteService(undefined, inst)
    })

    test("0", async () => {
        await inst2.handleCron()
    })
})

describe("getList", () => {
    let inst: any
    let inst2: any

    beforeEach(() => {
        inst = new user_service.UserService(undefined, undefined)
        inst2 = new wang_vote_service.WangVoteService(undefined, inst)
    })

    test("0", async () => {
        await inst2.getList()
    })
})

describe("vote", () => {
    let inst: any
    let inst2: any

    beforeEach(() => {
        inst = new user_service.UserService(undefined, undefined)
        inst2 = new wang_vote_service.WangVoteService(undefined, inst)
    })

    test("0", async () => {
        await inst2.vote(false, "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E")
    })

    test("1", async () => {
        await inst2.vote(false, false)
    })

    test("2", async () => {
        await inst2.vote(true, "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E")
    })

    test("3", async () => {
        await inst2.vote("user_name", false)
    })

    test("4", async () => {
        await inst2.vote("username", "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E")
    })

    test("5", async () => {
        await inst2.vote("", true)
    })
})

// @ponicode
describe("voteAlter", () => {
    let inst: any
    let inst2: any

    beforeEach(() => {
        inst = new user_service.UserService(undefined, undefined)
        inst2 = new wang_vote_service.WangVoteService(undefined, inst)
    })

    test("0", async () => {
        await inst2.voteAlter("Edmond")
    })

    test("1", async () => {
        await inst2.voteAlter(false)
    })

    test("2", async () => {
        await inst2.voteAlter(true)
    })

    test("3", async () => {
        await inst2.voteAlter("user_name")
    })

    test("4", async () => {
        await inst2.voteAlter("George")
    })

    test("5", async () => {
        await inst2.voteAlter("")
    })
})
