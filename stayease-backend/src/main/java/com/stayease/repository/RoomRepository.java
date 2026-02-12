package com.stayease.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stayease.entity.Pg;
import com.stayease.entity.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {
//    List<Room> findByPgId(Long pgId);
//    boolean existsByRoomNumberAndPg_Id(String roomNumber, Pg pg);
//    List<Room> findByPgIdAndSharing(Long pgId, int sharing);
    
    boolean existsByRoomNumberAndPg_Id(String roomNumber, Long pgId);

    List<Room> findByPgId(Long pgId);

    List<Room> findByPgIdAndSharing(Long pgId, int sharing);
    boolean existsByRoomNumberAndPg_IdAndIdNot(
            String roomNumber,
            Long pgId,
            Long roomId
        );
}
