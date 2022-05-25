import { UserType } from '../../types';
import './user.scss';

export const User = ({
  name, email, phone, company, website,
}: UserType) => (
  <div className="user">
    <table className="user__personal-information">
      <tbody>
        <tr>
          <td className="user__personal-empty-cell" />
          <td className="user__personal-information-name" colSpan={5}>{name}</td>
          <td className="user__personal-empty-cell" />
        </tr>
        <tr>
          <td className="user__personal-empty-cell" />
          <td className="user__personal-information-cell">{email}</td>
          <td className="user__personal-information-cell">{phone}</td>
          <td className="user__personal-information-cell">{website}</td>
          <td className="user__personal-information-cell">{company.name}</td>
          <td className="user__personal-information-cell">{company.bs}</td>
          <td className="user__personal-empty-cell" />
        </tr>
      </tbody>
    </table>
  </div>
);
