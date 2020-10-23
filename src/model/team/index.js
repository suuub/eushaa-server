const { User, teams } = require('../../../db/models');

exports.insert = async() => {
    const team = await teams.create()
    return team.dataValues;
}

exports.getTeamByUserId = async user_id => {
	const team = await teams.findOne({
		include: {
			model: User,
			where: { id: user_id },
		},
	})
	return team
}

exports.getUsersByTeamId = async team_id => {
	const users = await User.findAll({
		include: {
			model: teams,
			where: { id: team_id },
		},
	})
	return users
}

exports.update = async (id, update_datas) => {
	const [result, team] = await teams.update(update_datas, { where: { id } })
	return result
}

exports.increase = async (id, keys) => {
  try {
    const team = await teams.findByPk(id)
    const incrementResult = await team.increment(keys);
    return team.reload()
  } catch (err) {
    console.error(err)
  }
}

exports.removeTeam = async id => {
    try {
        const result = await teams.destroy({
            where: {
                id
            }
        })
        return result
    } catch (err) {
        console.error(err)
    }
}
